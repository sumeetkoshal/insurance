# Insurance Demo

The goal of this demo is to highlight Solace messaging in a modern responsive insurance agent mobile application.

If you're new to Solace messaging, you can learn more here:

* [http://dev.solacesystems.com]()

## Introduction
This demo is to demonstrates how modern responsive insurance agent applications can be build to communicate directly to high performance Solace messaging system. Thus avoiding legacy way of communicating via web servers in the middle, which becomes a bottleneck by communicating synchronously to slow backend processing systems.

By having Solace in the middle of a mobile apps and slow backend systems, Solace decouples and stabilizes backend systems (especially under huge volume) and trickle feed at the rate downstream systems can process and respond. Since there is no webserver in the middle for request and response, with minimal payload the responses are very fast. Solace has the capability to terminate 200,000 streaming web client connection.

This demo typically shows how insurance agents can use iPad/Mobile applications on the fields for Customer Account Opening, Claims Filing and crosssell & upsell. Solace also underpins the ESB (Camel based) and feeds the Hadoop big data storage (not a part of the demo).The purpose of this demo is also to highlight challenges/limitations of typical/legacy REST based applications and to demonstrate Solace capability to allow browser/phone based applications to connect directly to Solace messaging routers and [do streaming REST based request/reply messaging](https://sftp.solacesystems.com/Portal_Docs/#page/REST_Messaging_Protocol_Guide/About_This_Document.html).


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
