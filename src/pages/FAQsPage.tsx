import PageContainer from "@/components/PageContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Q1. Why is my lifestylereset.app not working?",
    content: (
      <div className="space-y-4">
        <p>Kindly review the items listed below.</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure your internet connection is active.</li>
          <li>
            Verify your internet speed by accessing the following links or any other website you prefer:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><a href="https://fast.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://fast.com</a></li>
              <li><a href="https://fiber.google.com/speedtest" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://fiber.google.com/speedtest</a></li>
              <li><a href="https://www.speedtest.net" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://www.speedtest.net</a></li>
            </ul>
            <p className="mt-2">For <strong className="underline">lifestylereset.app</strong> to function correctly, your internet connection must have a minimum speed of <strong>16MB (Mbps)</strong>.</p>
          </li>
          <li>It is recommended to use Google Chrome browser for <strong className="underline">lifestylereset.app</strong>. 🌐</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
      </div>
    ),
  },
  {
    q: "Q2. Why is my lifestylereset.app running slowly?",
    content: (
      <div className="space-y-4">
        <p>Kindly review the items listed below.</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            Verify your internet speed by accessing the following links or any other website you prefer:
            <ul className="list-disc pl-6 mt-1 space-y-1">
              <li><a href="https://fast.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://fast.com</a></li>
              <li><a href="https://fiber.google.com/speedtest" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://fiber.google.com/speedtest</a></li>
              <li><a href="https://www.speedtest.net" target="_blank" rel="noopener noreferrer" className="text-primary underline">https://www.speedtest.net</a></li>
            </ul>
            <p className="mt-2">For <strong className="underline">lifestylereset.app</strong> to function correctly, your internet connection must have a minimum speed of <strong>16MB (Mbps)</strong>.</p>
          </li>
          <li>It is recommended to use Google Chrome browser for <strong className="underline">lifestylereset.app</strong>. 🌐</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
      </div>
    ),
  },
  {
    q: "Q3. Why am I unable to login to lifestylereset.app?",
    content: (
      <div className="space-y-4">
        <p>If you're unable to login, please follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure your internet connection is active.</li>
          <li>Please make sure to enter correct <strong>Username</strong> and <strong>Password</strong>, otherwise you will see the error displayed in the screenshot (a).</li>
          <li>Ensure that you've input the correct <strong>Domain</strong> in the username. An incorrect domain entry will result in the error shown in the screenshot (b).</li>
          <li>If your gym license has expired, you will not be able to login as shown in the screenshot (c).</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
      </div>
    ),
  },
  {
    q: "Q4. How can I change user's password for lifestylereset.app?",
    content: (
      <div className="space-y-4">
        <p>Following are the steps to change user's password for <strong className="underline">lifestylereset.app</strong>:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Login to the <strong className="underline">lifestylereset.app</strong> and navigate to the User Management section from the Settings left menu.</li>
          <li>This will open the Users list.</li>
          <li>Select user from the Users list, or use the search functionality.</li>
          <li>Click on your user's icon to access the detail page.</li>
          <li>On the detail page, go to the <strong>Change Password</strong> tab.</li>
          <li>In the provided fields, enter your New Password and Confirm Password, and then click the <strong>Change Password</strong> button.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q5. What steps should I take to update packages details or packages fees?",
    content: (
      <div className="space-y-4">
        <p>It is recommended to contact the <span className="underline cursor-pointer">support</span> team or share the updated packages details or brochure through the support WhatsApp group. Your packages modifications will be implemented within 24 hours.</p>
      </div>
    ),
  },
  {
    q: "Q6. How do I add a new member?",
    content: (
      <div className="space-y-4">
        <p>To add a new member, please follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Click on the <strong>Add New</strong> button, as illustrated in the screenshot.</li>
          <li>Next, select your desired package from the available list.</li>
          <li>Enter the member's details. Please note that the <strong>Name</strong> and <strong>Contact</strong> fields are required, so ensure they are filled accurately.</li>
          <li>Any fields marked in <strong className="text-destructive">red</strong> indicate that the provided information may be incorrect, so review and correct them.</li>
          <li>Once you've filled in all the necessary information, click on <strong>Proceed</strong> button.</li>
          <li>You'll then have the option to assign a Trainer to the member. Choose <strong>Yes</strong> if you want to assign a Trainer, otherwise select "<strong>No</strong>".</li>
          <li>After making your selection, click <strong>Register</strong> button.</li>
          <li>You will be directed to a screen displaying fees information.</li>
          <li>Click <strong>Collect Fees</strong>.</li>
          <li>A pop-up window will appear which has all the information about fees that you need to collect from customer.</li>
          <li>Click <strong>Save</strong>.</li>
          <li>Congratulations, your new member is now successfully registered.</li>
        </ol>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q7. How to take photo from camera while creating a new member?",
    content: (
      <div className="space-y-4">
        <p>You should follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>In the <strong>New Member</strong> wizard, click on the <strong>Capture Photo</strong> option.</li>
          <li>A notification popup will appear, proceed by clicking the <strong>Allow</strong> button.</li>
          <li>Select the <strong>Take Picture</strong> option.</li>
          <li>Click on <strong>Crop Picture</strong>.</li>
          <li>Choose the <strong>Upload Picture</strong> option.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q8. How to upload a photo without a camera?",
    content: (
      <div className="space-y-4">
        <p>Please follow the steps outlined below:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>In the <strong>New Member</strong> wizard, select the <strong>Upload Photo</strong> option.</li>
          <li><strong>Add Profile Photo</strong> popup will appear.</li>
          <li>Choose the desired member's image stored on your computer.</li>
          <li>Utilize your mouse to crop the image appropriately, then select the <strong>Crop Picture</strong> option.</li>
          <li>Proceed by clicking on the <strong>Upload Picture</strong> option.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q9. I am not able to upload photo. What should I check?",
    content: (
      <div className="space-y-4">
        <p>If you're facing issues with uploading a photo, here are a few steps you can take to troubleshoot:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>File Format and Size:</strong> Ensure that the photo you're trying to upload is in a supported format (such as JPEG, PNG) and that it doesn't exceed size limit of <strong>10MB</strong>.</li>
          <li><strong>Internet Connection:</strong> Ensure your internet connection is active. A slow or intermittent connection might hinder the upload process.</li>
          <li><strong>Browser Compatibility:</strong> Try using a different web browser. Sometimes, certain browsers may have compatibility issues with certain websites or platforms. It is recommended to use Google Chrome browser for <strong className="underline">lifestylereset.app</strong>. 🌐</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q10. How to update the member's package?",
    content: (
      <div className="space-y-4">
        <p>To update a member's package, please follow these steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Login to <strong className="underline">lifestylereset.app</strong> and from the left menu, select <strong>Members Management</strong>.</li>
          <li>This action will open the list of members.</li>
          <li>Click on the specific member from the list or use search functionality.</li>
          <li>On this member's detail page, the current Package Name will be prominently displayed.</li>
          <li>Click on the dropdown menu adjacent to the current package name and proceed to select the desired new package.</li>
          <li>A confirmation popup will appear; kindly click the <strong>Yes</strong> button to confirm.</li>
          <li>A success message will subsequently appear.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q11. How to add fees of a member?",
    content: (
      <div className="space-y-4">
        <p>Follow the below steps to add fees:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Open <strong>Member's Detail</strong> page for the member whose fees you want to add.</li>
          <li>Locate the <strong>Add Fee</strong> button.</li>
          <li>You will see a popup.</li>
          <li>Verify the member's <strong>Package</strong>. You can also assign or update member's package from dropdown.</li>
          <li>Now, please select the month and year for the fees. Check the <strong>Next Due Date</strong>; after fee payment, the member will be valid until this date. You can also add a comment.</li>
          <li>Click on <strong>Save</strong>. If you receive a success message, you're all set. However, if you encounter an error message such as <strong>Fees already paid</strong>, it means that the fees for that particular month have already been paid.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q12. How to send link to a member for online payment?",
    content: (
      <div className="space-y-4">
        <p>Follow the below steps for sending link to a member:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Open <strong>Members Management</strong> and click on the <strong>WhatsApp</strong> icon for the specific member.</li>
          <li>After clicking, you will see the screen. Press <strong>Continue to Chat</strong>. If you have <strong className="underline">WhatsApp for Windows</strong>, then it will automatically open and from there, you can send the online payment link to the member.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
      </div>
    ),
  },
  {
    q: "Q13. How a gym's member can pay his/her fees online?",
    content: (
      <div className="space-y-4">
        <p>Member can pay the fees online by following the steps below:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Member will receive an online payment link from gym on his/her <strong>WhatsApp</strong>.</li>
          <li>After clicking on the link, member will be directed to the online payment page of <strong className="underline">lifestylereset.app</strong>.</li>
          <li>After verifying the <strong>Fee Detail</strong>, member will click on <strong>How to pay</strong>, the gym's bank details will appear. Customers can copy the account number and make their fee payments online.</li>
          <li>After paying, click on <strong>Upload</strong> button and upload the fee invoice that was generated at the time of online payment.</li>
          <li>At last, press <strong>Submit</strong>.</li>
          <li>After submitting the invoice, customer can also send confirmation message to gym's owner by clicking on <strong>WhatsApp</strong> icon.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q14. How to accept online payment request?",
    content: (
      <div className="space-y-4">
        <p>Follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Open <strong>Requests Management</strong> and click on the <strong>Detail</strong> icon of a specific fee submission request you want to accept.</li>
          <li>Fee request detail will open. Review member and fee details and click on <strong>Approve</strong> button.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q15. How to send online payment link to members who haven't paid their fees?",
    content: (
      <div className="space-y-4">
        <p>It is recommended to open <strong className="underline">lifestylereset.app</strong> on your mobile or install <strong className="underline">WhatsApp for Windows</strong> on your computer and follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Navigate to the <strong>Defaulter Report</strong> and click on the <strong>WhatsApp</strong> icon corresponding to a specific member.</li>
          <li>The WhatsApp application will launch on your mobile device. Proceed to tap the send button.</li>
        </ol>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q16. How do I send a fees invoice to a member via WhatsApp?",
    content: (
      <div className="space-y-4">
        <p>It is recommended to open <strong className="underline">lifestylereset.app</strong> on your mobile or install <strong className="underline">WhatsApp for Windows</strong> on your computer and follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Submit the fees of a member.</li>
          <li>From the <strong>Fee Details</strong> tab of member, click on the <strong>WhatsApp</strong> icon corresponding to a specific fees.</li>
          <li>The WhatsApp application will launch on your mobile device. Proceed to tap the send button.</li>
        </ol>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q17. How do I send fees invoice in pdf format via WhatsApp?",
    content: (
      <div className="space-y-4">
        <p>You should follow the below steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Navigate to the member's <strong>Fee Details</strong> tab and select the <strong>Print</strong> icon.</li>
          <li>A fees invoice popup will appear.</li>
          <li>Press <strong>Ctrl + P</strong> to open the print dialogue.</li>
          <li>Provide a suitable name and save the file.</li>
          <li>You can then manually use your <strong>WhatsApp</strong> application to send the file to the desired member.</li>
        </ol>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q18. Why is the fee invoice pop-up not showing up on fee submission?",
    content: (
      <div className="space-y-4">
        <p>If the fee invoice pop-up is not appearing, it's likely that the browser's pop-up blocker is causing it to be blocked from displaying. To enable pop-ups in your browser, you should follow the instructions provided in this <span className="underline cursor-pointer text-primary">link</span>.</p>
      </div>
    ),
  },
  {
    q: "Q19. Member is active but he/she is not able to enter into the gym. What should I check?",
    content: (
      <div className="space-y-4">
        <p>You should check the following things:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>First you should check, member is not in the defaulter list.</li>
          <li>Navigate to the <strong>Member Settings</strong> and ensure that the <strong>Next Due Date</strong> is set to a future date.</li>
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Ensure your internet connection is active.</li>
          <li>Go to the <strong>Member's Detail</strong> page and click on the <strong>Sync Again</strong> button in the <strong className="underline">lifestylereset.app</strong> and within few seconds <strong>Access Control Terminal (ACT)</strong> icon will change to Green.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q20. The members in the Inactive Members menu are not appearing. What steps should I take to resolve this issue?",
    content: (
      <div className="space-y-4">
        <p>Inactive members are not displayed by default because this data is archived, which may result in slow performance. To view all inactive members, click on the <strong>Search</strong> button.</p>
        <p>If you wish to find a particular member, enter information in the <strong>Name</strong>, <strong>Membership</strong>, <strong>Mobile</strong>, <strong>Email</strong>, or <strong>Card Number</strong> fields, and then click the <strong>Search</strong> button.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q21. Why a member is not able to enter in the gym?",
    content: (
      <div className="space-y-4">
        <p><strong>Ans.</strong> There are three possible reasons, why a member might be unable to enter:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Member is <strong>In-active</strong>.</li>
          <li>Member is <strong>Freezed</strong>.</li>
          <li>Member is <strong>Defaulter</strong>.</li>
        </ol>
        <p>If the above conditions are not applicable, please review the following points:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Navigate to the member's detail page and press the <strong>Sync Again</strong> button if the <strong>Access Control Terminal</strong> icon is still red.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q22. Why is the member still able to enter the gym even though they haven't submitted their fee?",
    content: (
      <div className="space-y-4">
        <p>To address this issue, please review the following points:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Login to <strong className="underline">lifestylereset.app</strong> and go to <strong>branch details</strong>. Make sure the lock indicates <strong>Yes</strong>. If its <strong>No</strong>, defaulters will be able to enter into the gym.</li>
          <li>If it is <strong>Yes</strong> then from the left menu, select <strong>Members Management</strong>.</li>
          <li>This action will display the list of members.</li>
          <li>Click on the specific member from the list or use the search functionality.</li>
          <li>On this member's detail page, check the <strong>Access Control Terminal (ACT)</strong> icon. If it's displayed in green, contact the <span className="underline cursor-pointer">support</span> team. If it's red, proceed with the following checks.</li>
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Ensure your internet connection is active.</li>
          <li>From the <strong>Member's Detail</strong> page, click the <strong>Sync Again</strong> button. After a few seconds, the member's entry will be removed from the <strong>Access Control Terminal (ACT)</strong>, and the member won't be able to enter the gym if the gym settings dictate locking the ACT for defaulters.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q23. How do I deactivate a member?",
    content: (
      <div className="space-y-4">
        <p>To deactivate a member, navigate to <strong>Members Management</strong> and select the specific member you want to deactivate. On this page, you will find a <strong>Deactivate</strong> button.</p>
      </div>
    ),
  },
  {
    q: "Q24. How do I activate a member?",
    content: (
      <div className="space-y-4">
        <p>To activate a member, navigate to <strong>Inactive Members</strong> and select the specific member you want to activate. On this page, you will find a <strong>Activate</strong> button.</p>
        <p>Click on <strong>Activate</strong> button and a confirmation prompt will appear. To proceed with activation, click <strong>Yes</strong> and the member's account will be activated.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q25. How do I change Next Due Date of member?",
    content: (
      <div className="space-y-4">
        <p>To change the <strong>Next Due Date</strong> of a member, open member's detail and go to <strong>Member Settings</strong>.</p>
        <p>There, you will see the <strong>Next Due Date</strong> section. From the calendar, you can change the next due date, but don't forget to press the <strong>Update</strong> button; otherwise it will not be changed.</p>
      </div>
    ),
  },
  {
    q: "Q26. What is the preferred mode of connection between a desktop computer and an Access Control Terminal (ACT)?",
    content: (
      <div className="space-y-4">
        <p>Using <strong>LAN</strong> is the recommended method of connecting your desktop computer and <strong>Access Control Terminal (ACT)</strong>. Additionally, ensure that both your desktop computer and <strong>Access Control Terminal (ACT)</strong> are on the same network. For example, if the IP Address of your computer is 127.16.240.203, then first three groups i.e <strong>127.16.240</strong> should be same on both of your computer and Access Control Terminal (ACT).</p>
      </div>
    ),
  },
  {
    q: "Q27. How do I register finger using biometric scanner device?",
    content: (
      <div className="space-y-4">
        <p>After completing the <strong>Add New Member</strong> process on <strong className="underline">lifestylereset.app</strong>, if the Lifestyle Reset Console App on the desktop is up and running, the registered member will be automatically included in the <strong>Access Control Terminal (ACT)</strong> and will subsequently appear within the ZKTimes.net application. To register a fingerprint using a small scanner device, follow these steps:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Launch the <strong>ZKTimes.net</strong> application.</li>
          <li>Navigate to the <strong>Personal</strong> tab located in the top menu.</li>
          <li>Enter the membership number in search to get the desired member.</li>
          <li>In the Member details section, there is a <strong>Biometric</strong> icon.</li>
          <li>Clicking on this icon will open a new window, presenting two options at the top.</li>
          <li>Choose <strong>Sensor</strong> option and then proceed to select the specific finger for registration.</li>
          <li>Place the finger you want to register onto the sensor surface.</li>
          <li>You need to scan your specific fingers 3 times.</li>
          <li>Upon successful completion, a success message <strong>Biometric is registered</strong> will appear.</li>
          <li>Additionally, the registered fingerprint will be added into the <strong>Access Control Terminal (ACT)</strong> system.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q28. Despite creating a new member, the user hasn't been added to the Access Control Terminal (ACT) even after 5 minutes. What steps should I take at this point?",
    content: (
      <div className="space-y-4">
        <p>You should verify the following things:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Ensure your internet connection is active.</li>
          <li>Go to the <strong>Member's Detail</strong> page and click on the <strong>Sync Again</strong> button in the <strong className="underline">lifestylereset.app</strong> and within few seconds <strong>Access Control Terminal (ACT)</strong> icon will change to Green.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q29. A member was in defaulter list and after fee payment, his/her Access Control Terminal (ACT) icon is still Red. What steps should I take to troubleshoot this?",
    content: (
      <div className="space-y-4">
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Ensure your internet connection is active.</li>
          <li>Go to the <strong>Member's Detail</strong> page and click on the <strong>Sync Again</strong> button in the <strong className="underline">lifestylereset.app</strong> and within few seconds <strong>Access Control Terminal (ACT)</strong> icon will change to Green.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
        <p>Click <span className="underline cursor-pointer text-primary">here</span> to watch the video explanation.</p>
      </div>
    ),
  },
  {
    q: "Q30. I have marked a member as Inactive but his/her Access Control Terminal (ACT) is still green. What steps should I take at this point?",
    content: (
      <div className="space-y-4">
        <ol className="list-decimal pl-6 space-y-3">
          <li>Ensure the <strong>Lifestyle Reset Console App</strong> on the desktop is up and running.</li>
          <li>Confirm that the <strong>Lifestyle Reset Console App</strong> is displaying a green connectivity message.</li>
          <li>Ensure your internet connection is active.</li>
          <li>Go to the <strong>Member's Detail</strong> page and click on the <strong>Sync Again</strong> button in the <strong className="underline">lifestylereset.app</strong> and within few seconds <strong>Access Control Terminal (ACT)</strong> icon will change to Red.</li>
        </ol>
        <p>If you are facing any problem, please contact the <span className="underline cursor-pointer">support</span> team for further assistance.</p>
      </div>
    ),
  },
  {
    q: "Q31. What is Lifestyle Reset Software?",
    content: (
      <div className="space-y-4">
        <p>Lifestyle Reset is a gym management software that provides a complete solution for gym owners to run their gyms smoothly, automate gym operations, and offer 24/7 gym access. Lifestyle Reset is recognized as one of the best and top gym management systems in Pakistan and the U.A.E., offering an end-to-end (e2e) solution for gyms.</p>
      </div>
    ),
  },
  {
    q: "Q32. Can I purchase gym software online?",
    content: (
      <div className="space-y-4">
        <p>Yes, you can buy gym software online by clicking the link below, and we will contact you shortly to proceed further.</p>
        <p><a href="#" className="text-primary underline">Contact Us</a></p>
      </div>
    ),
  },
  {
    q: "Q33. Why I need gym software?",
    content: (
      <div className="space-y-4">
        <p>It streamlines the management of gyms and fitness centers, offering a wide range of features that benefit both gym owners and members. With 24/7 Mobile Monitoring, you can have control in the palm of your hand. We've got your back when it comes to dues, with friendly reminders through our WhatsApp and SMS services. Enjoy hassle-free check-ins and check-outs with our integrated Biometric and RFID Card System. Stay on track with Real-Time Attendance Recording. Say goodbye to queues and make payments online with just a few clicks. You'll be able to view detailed revenue reports generated by trainers, members, and visitors. Your gym's new members can skip the lines and unlock their fitness adventure in a snap with Self Registration through QR Code and much more!</p>
      </div>
    ),
  },
];

export default function FAQsPage() {
  return (
    <PageContainer title="FAQs" breadcrumbs={[{ label: "FAQs" }]}>
      <Accordion type="multiple" className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg overflow-hidden">
            <AccordionTrigger className="bg-sidebar-accent px-4 py-3 text-sm font-semibold text-sidebar-accent-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="px-6 py-5 text-sm leading-relaxed">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageContainer>
  );
}
