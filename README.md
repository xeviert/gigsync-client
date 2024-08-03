# GigSync - Music Venue CRM

GigSync is a client-side application designed to streamline the management of music venues, artists, and events. This project serves as a CRM (Customer Relationship Management) tool for venue owners and event organizers to efficiently manage bookings, track sales, and handle event logistics.

For backend details, see the [GigSync API](https://github.com/xeviert/gigsync-api) repository.


## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Description

GigSync is a web-based application that enables music venue owners to manage their venues, artists, and events all in one place. It provides a dashboard for tracking upcoming and past events, managing artist information, and analyzing sales data. The application also supports secure authentication and authorization for users.

## Features

- **Dashboard**: View upcoming and past events with detailed information.
- **Artist Management**: Manage artist details, including profiles and images.
- **Event Management**: Create and edit events with easy-to-use forms.
- **Sales Tracking**: Input and analyze sales data, including ticket and merchandise sales.
- **Secure Authentication**: User login and registration with JWT-based authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To set up the GigSync client-side project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xeviert/gigsync-client.git
   cd gigsync-client
  ```

2. **Install dependencies**:
   ```bash
    npm install
    ```

3. **Create a .env file**:
Add a .env file in the root of your project and configure the necessary environment variables:
   ```bash
    NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/api
  ```
  
4. **Run the development server**:
   ```bash
    npm run dev
    ```
  
5. **Open the application**:
Navigate to http://localhost:3000 in your browser to access the application.

## Usage
Once the application is running, you can use the following features:

- **Login/Register**: Create an account or log in using existing credentials.
- **View Dashboard**: Access your dashboard to see an overview of events and artists.
- **Manage Events**: Use the event management tools to create new events, update existing ones, and analyze sales data.
- **Edit Artists**: View and edit artist profiles, including updating images and biographies.

## Tech Stack
- **Frontend**: React.js, Next.js, Redux, Material-UI
- **Backend (API)**: Node.js, Express.js (refer to the GigSync API repository)
- **Database**: PostgreSQL