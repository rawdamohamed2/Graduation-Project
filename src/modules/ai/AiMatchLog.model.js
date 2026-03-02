import mongoose from 'mongoose';

const aiMatchLogSchema = new mongoose.Schema({
    // The booking/order that needs a worker
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",  // Changed from "Order" to "Booking" for consistency
        required: [true, 'Booking is required'],
        index: true
    },

    // Workers recommended by AI (ranked by score)
    recommendedWorkers: [{
        worker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Changed from "users" to "User"
            required: true
        },
        score: {
            type: Number,
            min: 0,
            max: 100,
            required: true
        },
        rank: Number,
        reasons: [String] // Why this worker was recommended
    }],

    // AI algorithm performance
    algorithm: {
        name: {
            type: String,
            enum: ['collaborative_filtering', 'content_based', 'hybrid', 'neural_network', 'rule_based'],
            default: 'hybrid'
        },
        version: String,
        confidence: {
            type: Number,
            min: 0,
            max: 1
        }
    },

    // Factors considered by AI
    matchingFactors: {
        location: {
            distance: Number, // in km
            score: Number
        },
        rating: {
            workerRating: Number,
            score: Number
        },
        price: {
            estimatedPrice: Number,
            workerPrice: Number,
            match: Number
        },
        availability: {
            workerSchedule: Boolean,
            score: Number
        },
        experience: {
            years: Number,
            completedJobs: Number,
            score: Number
        },
        skills: {
            matched: [String],
            missing: [String],
            score: Number
        },
        language: {
            match: Boolean,
            score: Number
        },
        previousBookings: {
            count: Number,
            successRate: Number
        }
    },

    // Final selection
    selectedWorker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    selectionReason: String,

    // Was the AI recommendation accepted?
    recommendationAccepted: {
        type: Boolean,
        default: null // null = pending, true = accepted, false = rejected
    },

    // If rejected, why?
    rejectionReason: {
        type: String,
        enum: ['worker_busy', 'price_too_high', 'location_far', 'customer_preference', 'other']
    },

    // Human override
    overriddenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    overrideReason: String,

    // Performance tracking
    performance: {
        workerAccepted: Boolean,
        bookingCompleted: Boolean,
        customerRating: Number,
        completionTime: Number,
        feedbackScore: Number
    },

    // Metadata
    processingTime: Number, // in ms
    workerPoolSize: Number,
    candidatesCount: Number,

    // Timestamps
    decisionAt: {
        type: Date,
        default: Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
aiMatchLogSchema.index({ booking: 1 });
aiMatchLogSchema.index({ 'recommendedWorkers.worker': 1 });
aiMatchLogSchema.index({ selectedWorker: 1 });
aiMatchLogSchema.index({ recommendationAccepted: 1, createdAt: -1 });
aiMatchLogSchema.index({ algorithm: 1, createdAt: -1 });

// Virtual for success rate
aiMatchLogSchema.virtual('successRate').get(function() {
    if (this.performance?.bookingCompleted && this.performance?.customerRating) {
        return {
            completed: this.performance.bookingCompleted,
            rating: this.performance.customerRating,
            score: (this.performance.customerRating / 5) * 100
        };
    }
    return null;
});

// Method to calculate recommendation accuracy
aiMatchLogSchema.methods.calculateAccuracy = function() {
    if (!this.performance) return null;

    const metrics = {
        workerAccepted: this.performance.workerAccepted ? 100 : 0,
        bookingCompleted: this.performance.bookingCompleted ? 100 : 0,
        ratingScore: this.performance.customerRating ? (this.performance.customerRating / 5) * 100 : 0
    };

    const accuracy = Object.values(metrics).reduce((a, b) => a + b, 0) / Object.keys(metrics).length;

    return {
        metrics,
        overall: Math.round(accuracy * 100) / 100
    };
};

// Static method to get AI performance stats
aiMatchLogSchema.statics.getAIStats = async function(options = {}) {
    const { startDate, endDate, algorithm } = options;

    const match = {};
    if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = new Date(startDate);
        if (endDate) match.createdAt.$lte = new Date(endDate);
    }
    if (algorithm) match['algorithm.name'] = algorithm;

    const stats = await this.aggregate([
        { $match: match },
        { $group: {
                _id: null,
                totalMatches: { $sum: 1 },
                acceptedMatches: {
                    $sum: { $cond: [{ $eq: ['$recommendationAccepted', true] }, 1, 0] }
                },
                rejectedMatches: {
                    $sum: { $cond: [{ $eq: ['$recommendationAccepted', false] }, 1, 0] }
                },
                avgProcessingTime: { $avg: '$processingTime' },
                completedBookings: {
                    $sum: { $cond: ['$performance.bookingCompleted', 1, 0] }
                },
                avgRating: { $avg: '$performance.customerRating' }
            }}
    ]);

    return stats[0] || {
        totalMatches: 0,
        acceptedMatches: 0,
        rejectedMatches: 0,
        avgProcessingTime: 0,
        completedBookings: 0,
        avgRating: 0
    };
};

// Static method to get top performing workers
aiMatchLogSchema.statics.getTopWorkers = async function(limit = 10) {
    const topWorkers = await this.aggregate([
        { $match: { 'recommendationAccepted': true, 'performance.bookingCompleted': true } },
        { $unwind: '$recommendedWorkers' },
        { $group: {
                _id: '$recommendedWorkers.worker',
                avgScore: { $avg: '$recommendedWorkers.score' },
                timesRecommended: { $sum: 1 },
                timesSelected: {
                    $sum: {
                        $cond: [
                            { $eq: ['$selectedWorker', '$recommendedWorkers.worker'] },
                            1, 0
                        ]
                    }
                },
                avgRating: { $avg: '$performance.customerRating' },
                completionRate: { $avg: { $cond: ['$performance.bookingCompleted', 100, 0] } }
            }},
        { $sort: { avgScore: -1, completionRate: -1 } },
        { $limit: limit },
        { $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'workerDetails'
            }},
        { $unwind: '$workerDetails' },
        { $project: {
                'workerDetails.password': 0,
                'workerDetails.__v': 0
            }}
    ]);

    return topWorkers;
};

module.exports = mongoose.model("AiMatchLog", aiMatchLogSchema);