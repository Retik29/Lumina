const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Post = require('../models/Post');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Generate an array of random ObjectIds to simulate likes
const generateFakeLikes = (count) => {
    return Array.from({ length: count }, () => new mongoose.Types.ObjectId());
};

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Delete existing posts to reseed with likes
        await Post.deleteMany({});
        console.log('Cleared existing posts.');

        // Find or create a system user to be the author
        let systemUser = await User.findOne({ email: 'system@lumina.com' });
        if (!systemUser) {
            systemUser = await User.create({
                name: 'Lumina System',
                email: 'system@lumina.com',
                password: 'hashedpassword123', // Dummy
                role: 'admin'
            });
        }

        const initialPosts = [
            {
                content: "Just finished my first meditation! Feeling so calm. It's amazing how taking 10 minutes for yourself can shift your entire day.",
                author: systemUser._id,
                authorName: "Anonymous",
                likes: generateFakeLikes(randomBetween(12, 28)),
                comments: [
                    {
                        content: "That's wonderful! Which meditation did you try?",
                        author: systemUser._id,
                        authorName: "Kind Soul"
                    },
                    {
                        content: "I need to start doing this too. Thanks for the inspiration!",
                        author: systemUser._id,
                        authorName: "Anonymous"
                    }
                ]
            },
            {
                content: "Struggled today but remembered I am stronger than my anxiety. Sending love and light to everyone here navigating a tough week.",
                author: systemUser._id,
                authorName: "Peer Support",
                likes: generateFakeLikes(randomBetween(18, 35)),
                comments: [
                    {
                        content: "You ARE stronger. Thank you for this reminder 💙",
                        author: systemUser._id,
                        authorName: "Anonymous"
                    }
                ]
            },
            {
                content: "It's okay to not be okay. Healing isn't linear, and today I'm choosing to be gentle with myself.",
                author: systemUser._id,
                authorName: "Anonymous",
                likes: generateFakeLikes(randomBetween(22, 40)),
                comments: [
                    {
                        content: "This hit different today. Needed to hear this.",
                        author: systemUser._id,
                        authorName: "Grateful Heart"
                    }
                ]
            },
            {
                content: "Finally reached out to a counselor today. It was scary, but I feel a huge weight lifted off my shoulders.",
                author: systemUser._id,
                authorName: "Brave Echo",
                likes: generateFakeLikes(randomBetween(15, 30)),
                comments: [
                    {
                        content: "So proud of you for taking that step! 🌟",
                        author: systemUser._id,
                        authorName: "Anonymous"
                    },
                    {
                        content: "That takes real courage. Wishing you all the best on your journey.",
                        author: systemUser._id,
                        authorName: "Warm Light"
                    }
                ]
            },
            {
                content: "Today I went for a walk without my phone and just listened to the birds. Sometimes the simplest things bring the most peace.",
                author: systemUser._id,
                authorName: "Anonymous",
                likes: generateFakeLikes(randomBetween(10, 25)),
                comments: []
            },
            {
                content: "Reminder: comparing your chapter 1 to someone else's chapter 20 will always feel unfair. Be patient with yourself.",
                author: systemUser._id,
                authorName: "Gentle Reminder",
                likes: generateFakeLikes(randomBetween(25, 45)),
                comments: [
                    {
                        content: "Screenshotting this. Needed it badly.",
                        author: systemUser._id,
                        authorName: "Anonymous"
                    }
                ]
            }
        ];

        await Post.insertMany(initialPosts);
        console.log('Database seeded successfully with initial posts and likes!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedPosts();
