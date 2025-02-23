# 🌊 Water Level Measuring and Management System

A smart water level measuring and management system that monitors the water level in a tank using an ESP32 microcontroller. The system captures real-time data on the water level and whether water is flowing into the tank, sends it to a Next.js backend, and stores it in a Supabase database. The frontend, built with Next.js and React, displays this data with key features like the current water level, estimated time to fill, and time left to fill.

## 📌 Features

### Current Features
- 📊 **Real-Time Water Level Monitoring**: Displays the current water level in the tank.
- ⏳ **Estimated Time to Fill**: Predicts the time required to fill the tank.
- ⏱️ **Time Left Calculation**: Shows the remaining time to fill the tank.
- 🔗 **ESP32 Integration**: Measures water levels and flow status, and sends the data via API.
- 📋 **Database Management**: Stores and manages the water level data using Supabase.

### Planned Features
- 🔐 **User Authentication**: Allow multiple users to track and manage their tanks.
- 🗣️ **AI Agent**: Implement voice-command support to retrieve and interact with water level data.

## 🛠️ Tech Stack

### Hardware
- **ESP32**: Microcontroller for measuring water level and flow status.

### Backend
- **Next.js**: For handling API requests and data processing.
- **Prisma**: ORM for interacting with Supabase.
- **Supabase**: PostgreSQL-based database for data storage.

### Frontend
- **Next.js + React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **Axios**: For handling API requests.
- **Lucide React**: For icons and visual enhancements.

## 📊 System Workflow

1. **Data Collection**:
   - ESP32 measures water levels and flow status.
2. **Data Transmission**:
   - Sends a POST request to the Next.js backend.
3. **Data Processing**:
   - Backend processes and stores the data in Supabase.
4. **Data Display**:
   - Frontend fetches and displays the real-time water level and estimates.

## 📦 Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/water-level-management.git
   cd water-level-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add your Supabase and Prisma configurations:
   ```bash
   DATABASE_URL="your_supabase_database_url"
   DIRECT_URL="your_supabase_url"
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📊 API Structure

### POST `/api/updateDatabase`
- **Request Body:**
  ```json
  {
    "username": "Deepansu",
    "currentwaterlevel": 4,
    "isactive": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Data recorded successfully"
  }
  ```

## 🚀 Future Improvements
- **Multi-User Management**: Enable user authentication and role-based access.
- **AI Voice Commands**: Integrate an AI agent for voice interactions.
- **Enhanced Analytics**: Provide insights like historical data trends and consumption patterns.

## 🤝 Contribution

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ using ESP32, Next.js, and Supabase.

