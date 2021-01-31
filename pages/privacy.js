import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";

const Page = ({}) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center text-black">Privacy Policy </h1>
      <p>LOMA SOFTWARE INC. (“LOMA”) Privacy Policy</p>
      <p>
        Protecting your privacy is really important to us. Accordingly, we’re
        providing this Privacy Policy to explain our practices regarding the
        collection, use, and disclosure of information that we receive when you
        use our Services. This Privacy Policy does not apply to any third-party
        websites, services, or applications, even if they are accessible through
        our Services. Any information that we collect is subject to the privacy
        policy in effect at the time that Information is collected. We may,
        however, modify and revise this Privacy Policy from time to time. If we
        make any material changes to this Privacy Policy, we’ll notify you of
        those changes by posting them on the Services or by sending you an email
        or other notification, and we’ll indicate when those changes will become
        effective. Finally, please note that, unless we define a term in this
        Privacy Policy, all capitalized words used in this Privacy Policy have
        the same meanings as in our Terms of Service.
      </p>
      <p>Your Privacy Rights</p>
      All businesses engaged in commercial activities in Canada must comply with
      the Canadian Standards Association Model Code for the Protection of
      Personal Information, which it incorporates. The Act gives you rights
      concerning the privacy of your personal information. LOMA is responsible
      for the personal information we collect and hold. To ensure this
      accountability, we have developed this policy, and trained our
      representatives about our policies and practices.
      <p>Why Does LOMA Need Personal Information</p>
      <p>
        We use your personal information for internal purposes. We do not share
        this information outside LOMA except with our approved agents, who help
        us to provide the service(s) you have requested. All of our approved
        agents are required to provide a level of privacy protection comparable
        to that provided in this policy and are not permitted to use your
        information for any other purpose, such as to market to you. We do not
        sell, rent or trade in personal information.
      </p>
      <p>What personal information do we collect?</p>
      <p>
        “Personal information” is any information that identifies you, or by
        which your identity could be deduced. Please note that “personal
        information” does not include either aggregate information that does not
        allow an individual to be identified, information about your visit to
        our websites which is not linked to you, information about your
        computer’s operating system and web browser software (this technical
        information is verified to ensure that our websites are optimized to
        serve our customers) or, the name, title or business address or phone
        telephone number of an employee of an organization.
      </p>
      <p>How do we collect your personal information?</p>
      <p>
        We collect information only by lawful and fair means and not in an
        unreasonably intrusive way. Wherever possible we collect your personal
        information in an active fashion directly from you. Sometimes we may
        obtain information about you from other sources for example, as an
        example, passively by recording data on the history of your acquisition
        of services from us.
      </p>
      <p>Consent</p>
      <p>
        In all cases, we will ask you to specifically consent if we collect,
        use, or disclose your personal information. Normally, we ask for your
        consent in writing, but in some circumstances, we may accept your oral
        consent, which we will document. In all cases, our goal is to ensure
        compliance with Canada’s Anti-Spam Legislation (CASL).
      </p>
      <p>Use of Your Information</p>
      <p>
        We use your personal information to provide our services to you, to
        administer our client databases and to include you in any of our direct
        marketing activities. If you tell us that you no longer wish to receive
        information about our services we will not send any further material.
        LOMA does not disclose your personal information to any third party to
        enable them to market their products and services. Your consent to our
        use of your personal information can be withdrawn at any time by
        following the directions at the end of this policy. LOMA will retain
        your personal information for only the period of time which is
        reasonable under the circumstances and once your personal information is
        no longer required for the purposes discussed above, it will be deleted.
      </p>
      <p>Disclosure of your Personal Information</p>
      <p>
        Under certain circumstances, LOMA will disclose your personal
        information: when we are required or authorized by law to do so, for
        example if a court issues a subpoena; when you have consented to the
        disclosure; when the services we are providing to you requires us to
        give your information to third parties, your consent will be implied,
        unless you tell us otherwise; where it is necessary to establish or
        collect fees; if we engage a third party to provide IT services to us
        (like computer back-up services or archival file storage) and the third
        party is bound by our privacy policy, please note that such service
        provider(s) may be located outside of Canada; if the information is
        already publicly known.
      </p>
      <p>Updating Your Information</p>
      <p>
        Since we use your personal information to provide services to you, it is
        important that the information be accurate and up-to-date. If any of
        your information changes, please inform us by contacting us as described
        at the end of this Privacy Policy so that we can make any necessary
        changes. Is My Personal Information Secure? LOMA takes all reasonable
        precautions to ensure that your personal information is kept safe from
        loss, unauthorized access, modification or disclosure. Among the steps
        taken to protect your information are: premises security; restricted
        file access to personal information to only those with a need to know;
        deploying technological safeguards like security software and firewalls
        to prevent hacking or unauthorized computer access; internal password
        and security policies; secure disposal of personal information no longer
        needed; and screening and training of personnel. LOMA cannot, however,
        guarantee that loss, misuse or unauthorized use will never occur (e.g.
        that someone will overcome our security measures). If you receive any
        electronic communication which purports to be from LOMA that you have
        any questions or concerns about, please contact us. Spam, improper use,
        and pirating of domain names and email addresses is a growing problem,
        so we appreciate hearing about incidents in order that we may
        investigate them and provide you the best customer service.
      </p>
      <p>Access to Your Personal Information</p>
      <p>
        You may ask for access to any personal information we hold about you by
        contacting us as described at the end of this Privacy Policy. Summary
        information is available on request and we will attempt to respond to
        the request within 30 days of receipt.
      </p>
      <p>Correcting Errors</p>
      <p>
        LOMA attempts to ensure that personal information is accurate, complete
        and up-to-date for the purposes for which it is used. If LOMA holds
        information about you and you can establish that it is not accurate,
        complete and up-to-date, LOMA will take reasonable steps to correct it.
      </p>
      <p>Communicating with Us</p>
      <p>
        You should be aware that any channel of communication, such as e-mail,
        is not 100% secure, and you should be aware of this when contacting us
        to send personal or confidential information.
      </p>
      <p>Changes to this Privacy Policy</p>
      <p>
        Since LOMA regularly reviews all of its policies and procedures, we may
        change our Privacy Policy from time to time without notice. This Privacy
        Policy was last updated on September 25th, 2018. A copy of all
        amendments will be on file at our offices.
      </p>
      <p>Requests for Access</p>
      <p>
        If you have any questions, complaints or wish to access your personal
        information, email us at: privacy@shoploma.ca
      </p>
      <p>
        If you are not satisfied with our response, the Privacy Commissioner of
        Canada can be reached at: 112 Kent Street Place de Ville Tower B, 3rd
        Floor Ottawa, Ontario K1A 1H3 1.800.282.1376.
      </p>
      <p>Website</p>
      <p>
        For your convenience our website may contain links to other sites, which
        are not governed by this Privacy Policy. Our site may also be referenced
        on or accessible through links contained on other sites, including sites
        of third parties. However, we have not investigated, and are not
        responsible for, the privacy practices or content of those sites. Their
        policies and protections may be different than those offered by LOMA. We
        encourage you to investigate and review the privacy practices of those
        sites prior to use. On our website, like most other commercial websites,
        we may monitor traffic patterns, site usage and related site information
        in order to optimize our web service, solutions and offerings. We may
        provide aggregated information to third parties, but these statistics do
        not include any identifiable personal information. When you interact
        with our websites, we may use a browser feature, known as a “cookie”
        (which is a small computer file), to verify non-identifiable information
        about visitors to our websites and measure visitor traffic patterns. We
        do this to maintain the best possible websites. When you first visit our
        websites, the website manager may have implemented a program that
        creates a small computer file stored on your computer’s hard drive. We
        ensure that the minimum information required is placed in the cookie
        only so that we can recognize returning website visitors. The cookie
        does not contain personal information and we will not combine
        information in the cookie with personal information that would enable us
        to identify you individually. On subsequent visits to the website, our
        server communicates with your computer, reads the cookie, recognizes and
        confirms that you are a returning visitor. Our server uses this
        information to provide you with a “short cut” that facilitates the
        quickest, most efficient and best possible website experience. Most
        browser software allows you to delete cookies. You should consult your
        ISP for information on how to delete cookies. This may interfere with
        our ability to personalize your experience at our websites and be
        recognized, or may slow down performance.
      </p>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
