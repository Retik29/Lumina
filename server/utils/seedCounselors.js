const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const counselors = [
    {
        name: 'Dr. Anjali Mehta',
        email: 'anjali.mehta@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Anxiety & Stress Management',
        credentials: 'RCI Licensed Clinical Psychologist — Reg. No. A/1247',
        isApproved: true
    },
    {
        name: 'Dr. Raghav Sharma',
        email: 'raghav.sharma@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Depression & Mood Disorders',
        credentials: 'M.D. Psychiatry, NIMHANS Bangalore — MCI Reg. 48231',
        isApproved: true
    },
    {
        name: 'Dr. Priya Nair',
        email: 'priya.nair@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Academic Stress & Career Counseling',
        credentials: 'M.Phil Clinical Psychology, IHBAS Delhi — RCI/CRR/7893',
        isApproved: true
    },
    {
        name: 'Dr. Vikram Desai',
        email: 'vikram.desai@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Trauma & PTSD Recovery',
        credentials: 'Ph.D. Clinical Psychology, TISS Mumbai — RCI/CRR/5602',
        isApproved: true
    },
    {
        name: 'Dr. Sonal Kapoor',
        email: 'sonal.kapoor@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Relationship & Family Therapy',
        credentials: 'M.Phil Psychiatric Social Work, NIMHANS — RCI/PSW/3341',
        isApproved: true
    },
    {
        name: 'Dr. Arjun Reddy',
        email: 'arjun.reddy@lumina.com',
        password: 'counselor123',
        role: 'counselor',
        speciality: 'Substance Abuse & Addiction',
        credentials: 'M.D. Psychiatry, AIIMS Delhi — MCI Reg. 62714',
        isApproved: true
    }
];

const seedCounselors = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding counselors...');

        const salt = await bcrypt.genSalt(10);

        for (const counselor of counselors) {
            const existing = await User.findOne({ email: counselor.email });
            if (existing) {
                console.log(`⏩ Skipping "${counselor.name}" — already exists.`);
                continue;
            }

            const hashedPassword = await bcrypt.hash(counselor.password, salt);
            await User.create({ ...counselor, password: hashedPassword });
            console.log(`✅ Seeded counselor: ${counselor.name}`);
        }

        console.log('\n🎉 Counselor seeding complete!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding counselors:', error);
        process.exit(1);
    }
};

seedCounselors();
