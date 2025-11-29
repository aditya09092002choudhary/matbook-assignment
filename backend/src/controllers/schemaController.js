import { formSchema } from '../data/formSchema.js';

export const getFormSchema = (req, res) => {
  try {
    res.status(200).json(formSchema);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch form schema' 
    });
  }
};