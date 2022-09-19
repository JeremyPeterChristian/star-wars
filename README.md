## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Unit Tests

Running the following will trigger jest testing

```bash
yarn test
```

## Integration Tests

Running the following will open the cypress testing suite

```bash
yarn cypress
```

Select End to End testing
Then Chrome
Then the 'spec' file

You may need to wait a moment for the cypress suite to open up - it can be a little slow on launch

## Technologies

The UI components are driven by Ant Design. I'd expect to use a UI framework of some sort rather than building components from scratch. In the scenario that we didn't have a resource like this, I'd introduce a new story to build one.

The little styling I needed to do was done through styled components, though I'm also a fan of tailwind.

ReactQuery handles my API work and does a great job caching calls so we don't have to hammer the endpoint every time we switch page.

Most of my time was spent on the cypress and jest tests. If I was handed this challenge as a story in-situ I'd plan in the test support time, so I figured I'd do that here too.
