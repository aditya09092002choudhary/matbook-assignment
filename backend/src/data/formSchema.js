export const formSchema = {
  title: "Employee Onboarding Form",
  description: "Please fill out this form to complete your onboarding process",
  fields: [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your.email@company.com",
      validation: {
        required: true,
        regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        regexMessage: "Please enter a valid email address"
      }
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      validation: {
        required: true,
        min: 18,
        max: 100
      }
    },
    {
      name: "department",
      type: "select",
      label: "Department",
      placeholder: "Select your department",
      options: [
        { label: "Engineering", value: "engineering" },
        { label: "Marketing", value: "marketing" },
        { label: "Sales", value: "sales" },
        { label: "Human Resources", value: "hr" },
        { label: "Finance", value: "finance" }
      ],
      validation: {
        required: true
      }
    },
    {
      name: "skills",
      type: "multi-select",
      label: "Technical Skills",
      placeholder: "Select your skills",
      options: [
        { label: "JavaScript", value: "javascript" },
        { label: "Python", value: "python" },
        { label: "Java", value: "java" },
        { label: "React", value: "react" },
        { label: "Node.js", value: "nodejs" },
        { label: "SQL", value: "sql" },
        { label: "AWS", value: "aws" },
        { label: "Docker", value: "docker" }
      ],
      validation: {
        required: true,
        minSelected: 1,
        maxSelected: 5
      }
    },
    {
      name: "startDate",
      type: "date",
      label: "Start Date",
      placeholder: "Select your start date",
      validation: {
        required: true,
        minDate: "2024-01-01"
      }
    },
    {
      name: "bio",
      type: "textarea",
      label: "Short Bio",
      placeholder: "Tell us about yourself...",
      validation: {
        required: true,
        minLength: 10,
        maxLength: 500
      }
    },
    {
      name: "agreeToTerms",
      type: "switch",
      label: "I agree to the terms and conditions",
      validation: {
        required: true
      }
    }
  ]
};