const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Kafka Setup
const kafka = new Kafka({
    clientId: 'product-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const producer = kafka.producer();

async function connectKafka() {
    try {
        await producer.connect();
        console.log('Connected to Kafka');
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
    }
}

connectKafka();

// Routes
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
            },
        });

        // Send event to Kafka (optional - don't fail if Kafka is unavailable)
        try {
            await producer.send({
                topic: 'product-created',
                messages: [
                    { value: JSON.stringify(product) },
                ],
            });
        } catch (kafkaError) {
            console.warn('Failed to send Kafka event (non-critical):', kafkaError.message);
        }

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating product' });
    }
});

app.listen(port, () => {
    console.log(`Product Service listening on port ${port}`);
});
