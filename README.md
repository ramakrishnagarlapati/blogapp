# Blog Application

## Overview

This project is a blog application that allows users to create, view, edit, and delete blog posts. It includes features such as viewing a list of posts, viewing details of a single post, and managing posts with options to edit or delete them.

## Technologies Used

- React
- Node.js
- Express
- SQLite
- CSS for styling

## Installation Instructions

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/ramakrishnagarlapati/blogapp.git

cd blog-app
```

### 2. Install Dependencies

#### Frontend

Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install

```

#### Backend

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install

```

### 3. Start the Backend Server

In the backend directory, start the server:

```bash
npm start
```

The backend server will now be running on the specified port (e.g., `http://localhost:4000`).

Note: The backend is deployed on Render. As a free instance, it may experience a delay of up to 1 minute or more due to inactivity. This can cause requests to be slower than usual.

### 4. Start the Frontend Development Server

In a new terminal, navigate to the frontend directory and start the React development server:

```bash
cd frontend
npm start
```

The frontend development server will now be running on `http://localhost:3000`.

### 6. Access the Application

Open your web browser and go to http://localhost:3000 to view the application.

### Features

- View Posts: List of all blog posts.
- View Post Details: Detailed view of individual posts.
- Edit Post: Edit existing blog posts.
- Create Post: Form to create new blog posts.
- Delete Post: Remove posts from the application.
- Add comment: user can add comments to blog post
- view comments: list of comments associated with particular post

### Usage

1. Creating a Post: Click on create new post in header and fill out the form to create a new post.
2. Viewing Posts: The homepage displays a list of all posts. Click on a post title to view more details.
3. Editing a Post: Click the "Edit this post" button on the post details page to modify the post.
4. Deleting a Post: Click the "Delete this post" button on the post details page to remove the post.
5. Add a comment: fill the comment field and click on "Add Comment" button to add comment to the blog post

### API Endpoints

The backend provides the following API endpoints for interacting with blog posts:

- GET /posts : Retrieve a list of all blog posts.

- GET /posts/:postId : Retrieve the details of a specific blog post by its ID.
- POST /posts: Create a new blog post.

  - Request Body:
    ```json
    {
      "title": "Post Title",
      "content": "Post Content"
    }
    ```
  - Response: JSON object with the new post's ID.

- PUT /posts/:postId : Update an existing blog post by its ID.

  - Request Body:

  ```json
  {
    "title": "Updated Post Title",
    "content": "Updated Post Content"
  }
  ```

  - Response:
    Body:
    JSON object with a success message and the number of updated rows.

- DELETE /posts/:postId : Delete a blog post by its ID.

  - Response: JSON object with a success message and the number of deleted rows.

- GET /posts/:postId/comments : Retrieve a list of all comments associated with that blog post id.

- POST /posts/:postId/comments: Create a new comment.

  - Request Body:
    ```json
    {
      "postId": 2,
      "content": "Comment Content"
    }
    ```
  - Response: JSON object with the new comment's ID.
