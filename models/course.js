import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    actualPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    overview: {
        type: String,
        required: true,
        trim: true,
    },
    creatorName: {
        type: String,
        required: true,
        trim: true,
    },
    creatorEmail: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Course', courseSchema);
