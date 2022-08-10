# Local Scorecard

## Installation

When developing

```
make launch
```
or...

Development:

```
make build
```

Production:

```
make build-prod
```

## Activating Features
From time to time there may be features installed in the application that are turned off for production release. These are listed below.


| Feature                    | URL Parameter     |
| ---------------------------| ----------------- |
| Debugging                  | debug             |
| Auto resize the iframe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     | resize            |

To activate a preview of the feature, pass a truthy value to the URL parameter. For instance, if you wanted to turn the debugging feature on you could add `debug` to the URL as a query parameter, as shown below

```
... dashboards.justice.gov.uk/?debug=1
```