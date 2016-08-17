# Insurance Demo

The goal of this demo is to highlight Solace messaging in a modern responsive insurance agent mobile application.

If you're new to Solace messaging, you can learn more here:

* [http://www.solacesystems.com]()
* [https://sftp.solacesystems.com/Portal_Docs/]()
* [http://dev.solacesystems.com]()

## Introduction
This demo shows how insurance agent applications can communicate with back-end systems using Solace messaging technology, instead of with web servers that frequently become a bottleneck. Solace decouples and stabilizes communications between mobile apps and back-end systems by sending information at a rate those back-end systems can handle. Since there is no web server performing request and response in the middle, response times are very fast. Solace has the ability to maintain 200,000 streaming web client connection.

This demo also shows how insurance agents can use smartphone/tablet apps to open customer accounts, file claims, and cross-sell/up-sell existing customers. Finally, this demo highlights the limitations of most REST based applications, and shows the advantages of connecting browser/smartphone applications directly to Solace message routers with [streaming REST based request/reply messaging.](https://sftp.solacesystems.com/Portal_Docs/#page/REST_Messaging_Protocol_Guide/About_This_Document.html).


## Solace capabilities highlighted:
- Native REST support
- Shock absorber
- Throttling
- Fan Out
- High Throughput

## Technologies/Infrastructure Used
- Solace VMR running on AWS
- NGinx running on AWS for reverse proxy balancer and to handle the CORS issue.
- MySQL DB running on AWS
- HTML5
- REST
- Java based app running in Fuse (ESB) on AWS

## How to experience the demo

There are two main ways to experience this demo. There is a hosted version running in AWS. Or you can download and run it locally in your own environment.

### Try it online

The demo is hosted online. These links will get you access and provide a walk through which explains what you're seeing.

* [Live Online](https://sumeetkoshal.github.io/insurance/demo.html)
* [Demo Walk Through](https://sumeetkoshal.github.io/insurance/walkthrough.html)

### Run it locally

You can also run the demo locally on your own so you can really explore the technologies.

* [Instructions for running locally](https://sumeetkoshal.github.io/insurance/download.html)

## Dive in to the technical details

And finally if you want to understand exactly what's going on, I've tried to explain the details here:

* [Technical Details](https://sumeetkoshal.github.io/insurance/details.html)
