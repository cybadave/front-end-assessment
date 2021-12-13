# Parking Charge Calculator

## Documentation

I have 1 test case failing: 'Non Leap year calculated correctly'

Good old off-by-one errors. I would hazard a guess that the problem lies here:
```TypeScript
const full_days = getWeekDaysBetweenDates(start, end) - 1;
```

I probably don't always want to decrement this, and should find a better way of counting between dates exclusively.

exercise time boxed to 3 hours.

## The Challenge
You run a car park that, at the moment, has two charging options - Short Stay and Long Stay. Visitors choose which option they want to use when they enter the car park and the charge is calculated when they leave based on the length of their visit.

The following charges are used:

Short Stay
     £1.10 per hour between 8am and 6pm on weekdays, free outside of these times. Visits need not be whole hours and can last more than one day.

Long Stay
     £7.50 per day or part day including weekends, so the minimum charge will be for one day.

Design and code an application or library in Typescript (or JS if preferred) that will be used to calculate the total cost of a visit to the car park. We have already written specs to validate your calculations, and stubs for those specs to call. Feel free to replace those stubs if desired.

A UI is not required, however if you wish to create one please feel free.

## Examples 

A stay entirely outside of a chargeable period will return £0.00

A short stay from 07/09/2017 16:50:00 to 09/09/2017 19:15:00 would cost £12.28

A long stay from 07/09/2017 07:50:00 to 09/09/2017 05:20:00 would cost £22.50

## Using this Repo

This repo contains the skeleton of a Typescript Library solution, feel free to use this as a starting point. Starting from scratch is also fine if you wish to use different a different approach (e.g. Javascript, Webpack, Esbuild, Create-React-App).

This scaffold is a simple typescript library with no ui elements. 

To install modules, run the following command:

```bash
npm i
```

To build the solution, the following command may be used:
```
npm run build
```

Tests can be ran in watch mode or in a single run as shown below:
```bash
npm run test:watch
npm run test
```
## Submitting your Solution

Our firewall will likely block any .zip attachments to emails. Therefore, a link is greatly preferred (e.g. github or gitlab repo). 

Feel free to fork this repo or start from scratch.

**If you change how the build works, please ensure you update or replace this README.md with new instructions.**

## Tips

* Documentation of your thought process is appreciated. For example, explaining any assumptions or decisions you make, or improvements that you could later implement.
* It is up to you to decide how to handle the dates. Using a framework such as date-fns is fine, but you may find it easier to write your own date utilities.
* The provided unit tests are quite thorough. Therfore if your solution does not pass all edge cases it may still be considered. However, you should expect to be able to talk about this at a later interview.
* You are free to extend or replace the test suite if you wish.
* We are interested in SOLID, concise code. Consider this when designing and structuring your solution. Also consider how your design decisions help tackle the algorithmic complexity of the challenge. 
* There is no strict time limit, but as a guide, past candidates have said it cab be done in around 3 hours of focused work.
* Our machines are running Windows, so make sure you test your build appropriately!
* You may have noticed the `"engines"` config in the package.json. We will be be using at least the minimum version of node specified there to build your solution.
* Please replace or update this README.md if your build instructions change.


