# Okwulora Helps

A Nigerian-focused medical assistance platform that provides hope, support, and resources to Nigerians facing medical challenges.

## Features

- **Nigerian-Inspired Design**: Uses soothing colors that Nigerians can relate to, including:
  - Nigerian Green (primary): Represents growth, nature, and hope
  - Nigerian Gold (secondary): Represents prosperity and warmth
  - Nigerian Indigo (tertiary): Traditional color representing wisdom and spirituality
  - Earth tones: Warm, grounding colors representing stability and tradition

- **Naira Currency**: All monetary values are displayed in Nigerian Naira (₦)
- **Localized Content**: Nigerian names, locations, and cultural context throughout
- **Medical Assistance Requests**: Multi-step form for requesting medical help
- **Donation Platform**: Secure donation system with preset and custom amounts
- **Gallery of Hope**: Before and after transformation stories with lightbox viewing
- **Responsive Design**: Mobile-first approach with accessibility features

## Admin System

### **Authentication**
- Secure admin login with username/password
- Session management using localStorage
- Protected admin routes

### **Dashboard Overview**
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons for common tasks
- Monthly impact tracking

### **Stories Management**
- Create, edit, and delete transformation stories
- Upload before and after images
- Categorize stories by medical type
- Set publication status (draft/published)
- Search and filter functionality

### **Donations Management**
- View all donation records
- Track payment status and methods
- Export donation data to CSV
- Filter by date, status, and payment method
- Transaction ID tracking

### **Requests Management**
- Review help requests from users
- Update request status (pending → reviewing → approved → completed)
- Assign requests to staff members
- Priority-based sorting (urgent, high, medium, low)
- Detailed request information and notes

### **Admin Access**
- **URL**: `/admin/login`
- **Demo Credentials**:
  - Username: `admin`
  - Password: `okwulora2024`

## Color Scheme

The site uses a carefully selected color palette inspired by Nigerian culture:

- **Primary**: Green (hsl(120, 40%, 45%)) - Growth and hope
- **Secondary**: Gold (hsl(45, 80%, 55%)) - Prosperity and warmth  
- **Tertiary**: Indigo (hsl(240, 60%, 45%)) - Wisdom and spirituality
- **Earth**: Brown (hsl(30, 40%, 35%)) - Stability and tradition
- **Background**: Warm cream (hsl(45, 30%, 98%)) - Welcoming and comfortable

## Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data management
- Lucide React for icons
- Vite for build tooling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Access admin panel:
   - Navigate to `/admin/login`
   - Use demo credentials: `admin` / `okwulora2024`

## Cultural Sensitivity

This platform is designed with Nigerian cultural values in mind:
- Community-focused approach
- Emphasis on unity and compassion
- Respect for traditional values
- Localized language and context
- Nigerian phone numbers and addresses

## Contributing

We welcome contributions that help make this platform more accessible and culturally appropriate for Nigerians in need of medical assistance.

## Security Notes

- The current admin authentication is for demonstration purposes
- In production, implement proper JWT tokens and secure authentication
- Add rate limiting and input validation
- Use environment variables for sensitive configuration
- Implement proper session management
