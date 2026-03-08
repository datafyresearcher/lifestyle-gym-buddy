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
