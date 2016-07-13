# Insurance Demo
<a href="http://dev.solacesystems.com/tech/rest/" target="_blank">Using Solace REST Capabilities</a>

## Demo Introduction
> The purpose of this demo is to demonstrate how modern responsive insurance agent applications can be build to communicate directly to high performance Solace messaging system. Thus avoiding legacy way of communicating via web servers in the middle, which becomes a bottleneck by communicating synchronously to slow backend processing systems.

>By having Solace in the middle of a mobile apps and slow backend systems, Solace decouples and stabilizes backend systems (especially under huge volume) and trickle feed at the rate downstream systems can process and respond. Since there is no webserver in the middle for request and response, with minimal payload the responses are very fast. Solace has the capability to terminate 200,000 streaming web client connection.

> This demo typically shows how insurance agents can use iPad/Mobile applications on the fields for Customer Account Opening, Claims Filing and crosssell & upsell. Solace also underpins the ESB (Camel based) and feeds the Hadoop big data storage (not a part of the demo).The purpose of this demo is also to highlight challenges/limitations of typical/legacy REST based applications and to demonstrate Solace capability to allow browser/phone based applications to connect directly to Solace messaging routers and do streaming REST based request/reply messaging.


> ![About](./images/about.jpg)



## Demo Technical Details
### Solace features being used:
>- Native REST support
- Shock absorber
- Throttling
- Fan Out
- High Throughput

### Challenges/Limitations with Typical REST
>![Typical REST](./images/typical_rest.png)

>![Limitations of REST](./images/limitations_rest.png)

### Solace + REST Assured/Benefits
>![Solace + REST](./images/solace+rest.png)

### Technologies/Infrastructure Used
>- Solace VMR running on AWS
- NGinx running on AWS for reverse proxy balancer and to handle the CORS issue.
- MySQL DB running on AWS
- HTML5
- REST
- Java based app running in Fuse (ESB) on AWS


## Live Demo
<a href="http://52.74.193.178/insurance" target="_blank">Take me to the demo now</a>

## Demo Walkthrough
>- Open index.html in browser of your choice & Login.  
![Limitations of REST](./images/login.png)

>The default username is "sumeet" and password is "sumeet". Clicking on "Log Me In To My Account" will take you to "New Applications" page. In the background when you click on Login button, it send a message to Solace appliance which is processed and authenticated by the LoginHandler service.

- New application  
>The below screen takes you to the default landing page that you see after you are successfully authenticated by LoginService handler.
>![New Application](./images/new_app_screen.png)

>After you fill in the necessary details and choose required images to upload, click on the "Save Application" button. In the background this action will send several messages such as Application Data and Images data. These messages are received the application running within Fuse. The application validates, process and saves Application Data in the DB and images data on the disk (image files names are saved in the DB). It then sends the response back to the UI.

- Search existing applications  
>The below screen shows the search applications page.
>![Search Existing Applications](./images/search_apps.png)

>You have an option to search applications based on the first name of the applicants. You can leave this space blank and hit the search button to search all existing applications.

>The search response is listed below. You may click the individual record in the list to view/update.

- Update application  
>The below screen shows the edit/update application page.
> ![Limitations of REST](./images/update_app_screen.png)

>You may change any details as needed (including images) and hit "Update Application button". The backend application validates, process and saves the updated Application Data in the DB and images data on the disk (image files names are saved in the DB). It then sends the response back to the UI.

## Download, Install & Run this demo on my machine
1. <a href="http://dev.solacesystems.com/downloads/" target="_blank">Download VMR (Virtual Message Router), SolAdmin & its Release Notes</a>
2. Install/run VMR and SolAdmin as per the instructions in the release notes.
   <a href="http://dev.solacesystems.com/get-started/vmr-setup-tutorials/setting-up-solace-vmr/" target="_blank">Install/run VMR</a>
3. Create VPN (Partition) in Solace VMR
   <a href="./SolaceConfig/insurance.cli" target="_blank">Download CLI Script for VPN creation</a>
   - import this script in VMR as described below.
   - Run SolAdmin
   - Add newly deployed running VMR in Solace as managed apliance
     ![Add VMR](./images/SolAdmin-AddVMR.png)
   - Launch CLI
     ![Add VMR](./images/VMR-Launch-CLI.png)
   - Login in CLI
     ![Login CLI](./images/VMR-CLI-Login.png)
   - Create File Transfer User
     ![Create File Transfer User](./images/VMR-Create-FileTransfer-User.png)
   - Launch File transfer
     ![Launch File Transfer](./images/VMR-Launch-FileTransfer.png)
   - File Transfer Login
     ![File Transfer Login](./images/VMR-FileTransfer-Login.png)
   - Upload CLI Script in VMR
     ![Upload CLI Script](./images/VMR-Upload-CLI-Script.png)
   - Execute CLI Script
     ![Execute CLI Script](./images/VMR-Execute-CLI-Script.png)
   - Confirm the VPN has been created successfully
     ![Confirm VPN Creation](./images/VMR-Confirm-VPN-Creation.png)
   
4. <a href="http://dev.mysql.com/downloads/mysql/" target="_blank">Download, install and run MySQL server</a>
5. <a href="./DB%20Script.zip" target="_blank">Download and deploy the DB script</a>
   > Make sure you update the DB config under 
     source/main/resources/META-INF/spring/routes_config.xml file as needed
   [//]: # (<bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">)
         <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
         <property name="url" value="jdbc:mysql://localhost:3306/insurance"/>
         <property name="username" value="fuse_app"/>
         <property name="password" value="solace1"/>
      </bean>
6. <a href="http://www.jboss.org/products/fuse/download/" target="_blank">Download Fuse</a>
7. <a href="./FuseAPP/redleaf-insaurance-services-0.0.1-SNAPSHOT.jar" target="_blank">Deploy Fuse App under Fuse deploy folder</a>
   > Make sure you change the Solace VMR IP to point to your VMR IP under            
     source/main/resources/META-INF/spring/routes_config.xml file.
   [//]: # (<property name="environment">)
         <map>
             <entry key="java.naming.provider.url" value="smf://52.76.29.143" />
             <entry key="java.naming.factory.initial" value="com.solacesystems.jndi.SolJNDIInitialContextFactory" />
             <entry key="java.naming.security.credentials" value="password" />
             <entry key="java.naming.security.principal" value="ins_user" />
             <entry key="Solace_JMS_VPN" value="insurance" />
         </map>
      </property>

8. Start Fuse
9. [Download web application](./www).
> Make the changes as suugested in the images below in rest.js file under insurance/res/sol/
     ![Make the necessary changes](./images/UpdateREST-js.png)
