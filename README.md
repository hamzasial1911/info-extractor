# info-extractor

This project consists of a backend server and a frontend application. Follow the instructions below to set up and run both components.

## Backend Setup

1. Navigate to the `server` directory:
cd server

2. Create a virtual environment (optional but recommended):
```python -m venv venv```

3. Activate the virtual environment:
- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```

4. Install the required Python packages:
```pip install -r requirements.txt```

5. Run the backend server on port 8080:
python manage.py runserver 8080


Make sure to specify port 8080 as it is required to connect to the frontend.

## Frontend Setup

1. Navigate to the `client` directory:
cd client

2. Install all frontend dependencies using npm:
```npm install```

If you encounter any issues, make sure you have Node.js installed, or run `npm i -f` to forcefully install dependencies.

3. Run the frontend application:
```npm run dev```

The frontend will run on port 5173 by default.

## Accessing the Application

- Once both the backend and frontend are running, you can access the application in your web browser at the following URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

Ensure that the frontend is set up to communicate with the backend on port 8080, as mentioned in the project's requirements.

Happy coding!
