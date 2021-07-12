import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./policy.module.scss";

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy" description={null} keywords={null}>
      <div className={styles.container}>
        <Navbar />
        <section>
          <h1>Privacy Policy</h1>
          <p>
            This privacy policy (hereinafter referred to as "Privacy Policy") is
            intended to safeguard our customers to make them ensure; types of
            information MyTry collect when you access or visit www.mytryshop.com
            (hereinafter referred to as "website”), use of such information for
            our internal purpose and the circumstances, if any, under which we
            may disclose. This Privacy Policy is applicable only who visit
            website and by using the website, you agree to the terms of this
            Privacy Policy.
          </p>
        </section>
        <section>
          <h2>Personal Information</h2>
          <p>
            MyTry collect only personal information which you provide
            voluntarily, when you are:
            <ul>
              <li>Registering on to the website</li>
              <li>Purchasing products on the website</li>
              <li>Making product enquiries</li>
              <li>
                Contacting to any representative or employee or customer service
                representative of MyTry by email the personal information
              </li>
              <li>We collect from you include your name, e-mail address</li>
            </ul>
          </p>
        </section>
        <section>
          <h2>Non-personal information</h2>
          <p>
            MyTry collect non-personal information such as your browser type, IP
            address, operating system, internet service provider, and the domain
            name from which you accessed the website, browsing behaviour
            including but not limited to date and time of visit, total time of
            visit, pages visited, general demographic information for
            statistical purposes and uses. MyTry will not share any personal
            information about you with any third party except
            <ul>
              <li>
                The information may be shared and stored, on a strictly need to
                know basis with any third party service providers of our
                preference we may engage for hosting the website, to provide
                service relating to order fulfilment, website operation etc.,
                solely for the purpose of providing services in relation to the
                website.{" "}
              </li>
              <li>
                MyTry may process and store, in any country with preferred
                service providers, the information collected in connection with
                the website.
              </li>
              <li>
                The data protection laws in such countries may be different from
                that applicable in India and additional laws can me applicable
                as Law of Land.
              </li>
              <li>
                By making / registering use of the website, you expressly
                acknowledge and accept the storage, transfer and processing of
                information, outside of your country of residence.
              </li>
              <li>
                Where we have your consent, we may transfer or otherwise
                disclose information collected from you to our advertisers
                including but not limited to financial service providers (such
                as banks, insurance agents, mortgage lenders etc.) and
                non-financial companies (such as stores, airlines, etc.)
              </li>
              <li>
                Where the information is required to be shared by us under law
                such as (i) When we determine that there has been a violation of
                the Terms; (ii) to provide information to law enforcement
                agencies in response to any judicial / quasi-judicial order and;
                or (iii) in relation to any investigation on matters related to
                public safety, illegal activities, suspected fraud, threats to
                the physical safety of any person, etc. as may be permitted by
                law
              </li>
            </ul>
          </p>
        </section>
        <section>
          <h2>CONFIDENTIALITY</h2>
          <p>
            MyTry provide limited access of your personal information to
            employees who reasonably need to provide products or services
            support to you or in order for them to perform their designated
            functions. We take highest care of your data and follow multiple
            levels of operational and technical data safeguards to protect your
            personal information that we collect online, to prevent unauthorized
            access, maintain data accuracy, and avoid misuse of information.
          </p>
        </section>
        <section>
          <h2>USE OF COLLECTED INFORMATION</h2>
          <p>
            We may use the collected information from you which including but
            not limited to:
            <ul>
              <li>
                For facilitating your use of the website and for better
                understanding of your needs;
              </li>
              <li>
                For processing and fulfilling your orders for products offered
                on the website;
              </li>
              <li>For responding to your inquiries about the products;</li>
              <li>
                For directing information, promotional materials, and offers
                from MyTry to you;
              </li>
              <li>
                For contacting visitors of the website when and where necessary;
              </li>
              <li>For helping You resolve any issues with the website;</li>
              <li>For helping You resolve any issues with the website;</li>
            </ul>
          </p>
        </section>
        <section>
          <h2>COOKIES AND ACTION TAGS</h2>
          <p>
            MyTry uses cookie to track the pages on the website which visitors
            view. Cookies are small text files stored on the hard drive of the
            user's computer and are used for record-keeping purposes. "Action
            tags" may also be used in assisting the delivery of a cookie.
            Cookies often make Web surfing simpler by performing through
            functions such as, saving your personal preferences on usage of any
            specific website, ensuring you don't see that advertisements are not
            repeated etc. Advertisers and partners on the website may also use
            cookies, which we do not control and we are not responsible for
            information collected through them. You may choose to accept or
            refuse the cookies by changing the settings of your browser. If you
            choose to reject the cookies, your experience at the website may be
            diminished and certain features may not function as intended.
          </p>
        </section>
        <section>
          <h2>THIRD PARTY WEBSITE</h2>
          <p>
            The website may third party website links with different privacy
            policies than this website. Any link outside this website or third
            party website, this privacy policy void. Accordingly, we recommend
            that you review the privacy policy posted on any third-party website
            that you may access through the website.
          </p>
        </section>
        <section>
          <h2>CHANGES TO THIS PRIVACY POLICY</h2>
          <p>
            MyTry reserve right to change or amend privacy policy without
            further notice including but not limited to comply to applicable
            laws. We strongly advise that you revisit this Privacy Policy
            regularly to ensure that you are aware of the updated privacy
            practices. Your use of the website following any changes signifies
            that you accept these changes.
          </p>
        </section>
        <Footer />
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
