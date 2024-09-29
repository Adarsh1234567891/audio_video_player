# Video Audio App

This is a single-page React application featuring a video player, audio recorder, and dialogue display. It's designed with a mobile-first approach using Tailwind CSS.

## Features

- Video Player with play/pause and seeking functionality
- Audio Recording using Web Audio API
- Dialogue Display with editable fields
- Mobile-First Design using Tailwind CSS
- State Management with React Context API
- Navigation between dialogues
- Synchronization between recorded audio and video
- Basic error handling

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/video-audio-app.git
   cd video-audio-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the App

To start the development server:

```
npm start
```

The app will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

This app is set up for easy deployment to GitHub Pages. After pushing your changes to GitHub, run:

```
npm run deploy
```

This will create a production build and push it to the `gh-pages` branch of your repository.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)