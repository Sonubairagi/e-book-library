import { v2 as cloudinary } from 'cloudinary';
import { config } from './config.ts';

// Configuration
cloudinary.config({ 
    cloud_name: config.cloudinary_cloud_name || 'dnqlqaspp', 
    api_key: config.cloudinary_api_key || '498592789256173', 
    api_secret: config.cloudinary_api_secret || 'vIT37KGt7eC_kWc0BE8ws9E3WQ8'
});

export default cloudinary;