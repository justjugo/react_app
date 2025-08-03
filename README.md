# React Film Search

A simple and elegant movie search application built with React, Vite, and Tailwind CSS. This project allows users to search for movies, view details, and maintain a personal wishlist of their favorite films. It leverages The Movie Database (TMDb) API for fetching movie data and uses Appwrite as a backend to track and display trending searches.

## ✨ Features

-   **Movie Search**: Instantly search for movies by title.
-   **Wishlist Functionality**:
    -   **Add & Remove**: Easily add movies to a personal wishlist by clicking the heart icon on any movie card. Click again to remove it.
    -   **Persistent Storage**: Your wishlist is saved in your browser's `localStorage`, so it persists even after you close the tab or refresh the page.
    -   **Favorites Section**: View all your wishlisted movies in a dedicated "Favourite Movies" section on the homepage.
-   **Debounced Input**: Smart search functionality that waits for the user to stop typing before making an API request, ensuring a smooth user experience and efficient API usage.
-   **Trending Searches**: Displays a list of the most popular movie searches, powered by an Appwrite database.
-   **Pagination**: Navigate through multiple pages of search results.
-   **Dynamic UI**: Clean and responsive interface built with Tailwind CSS.
-   **Error Handling**: Gracefully handles API errors and loading states.


## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Database**: [Appwrite](https://appwrite.io/)
-   **Movie Data**: [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js and npm (or yarn) installed.
-   An account with [The Movie Database (TMDb)](https://www.themoviedb.org/signup) to get an API key.
-   An account with [Appwrite Cloud](https://cloud.appwrite.io/) for the backend.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd react_app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Appwrite

1.  Go to your [Appwrite Console](https://cloud.appwrite.io/) and create a new project.
2.  Under **Build**, navigate to **Databases** and create a new database.
3.  Inside your new database, create a new collection.
4.  Go to the **Attributes** tab for your collection and add the following attributes:
    -   `searchTerm` (Type: `String`, Required: `true`)
    -   `count` (Type: `Integer`, Required: `true`, Default: `1`)
    -   `movieId` (Type: `String`, Required: `true`)
    -   `posterUrl` (Type: `String`, Required: `true`)
5.  Go to the **Settings** tab for your collection and set the permissions. For this project, you can grant `Read`, `Create`, and `Update` access to the `any` role to allow the client-side code to interact with it.
    > **Note:** For a production application, you would want more restrictive permissions.
6.  Note down your **Project ID**, **Database ID**, and **Collection ID** for the next step.

### 4. Environment Variables

Create a `.env` file in the root of the `react_app` directory and add the following variables:

```env
# Get this from The Movie Database (TMDb) settings
VITE_TMDB_API_KEY=your_tmdb_api_key

# Get these from your Appwrite project console
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DB_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

Replace the placeholder values with your actual keys and IDs.

### 5. Run the Application

Start the Vite development server:

```bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

## ⚙️ How It Works

-   When a user types in the search box, the input is debounced to prevent excessive API calls.
-   Once the user stops typing, a request is made to the TMDb API to fetch movies matching the query.
-   If movies are found, the `updateSearchCount` function in `src/appwrite.js` is called.
    -   This function checks if the search term already exists in the Appwrite collection.
    -   If it exists, it increments the `count` attribute.
    -   If it doesn't exist, it creates a new document with the search term, movie details, and a count of 1.
-   The `fetchPopularMovies` function retrieves the top 5 documents from the Appwrite collection, ordered by the `count` in descending order, to display as "Trending Movies".
-   The **Wishlist** feature allows users to click a heart icon on a movie. This action adds or removes the movie from a state array, which is then persisted to `localStorage`. The "Favourite Movies" component reads from this state to display the user's selections.