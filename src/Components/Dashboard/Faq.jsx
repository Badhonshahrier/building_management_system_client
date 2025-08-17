import React from "react";

const Faq = () => {
  return (
    <div className="w-10/12 mx-auto pt-10 pb-10">
      <h2 className="text-4xl font-bold text-center text-gray-600 italic">
        Frequently Asked Questions
      </h2>
      <p className="text-center font-medium text-gray-500 mb-10 sm:pt-6 max-w-3xl mx-auto text-sm sm:text-base">
        "Have questions about how our Building Management System works? Find answers to the most common questions here. Learn about user roles, apartment management, payments, and dashboard features."
      </p>
      <div className="flex w-full flex-col lg:flex-row gap-6">
        <div className="card rounded-box w-2/3 grid grow place-items-center">
          <img
            className="rounded-lg ml-40 md:ml-0 lg:ml-0 w-full h-full object-fill"
            src="https://i.ibb.co.com/p62SF8mG/download.jpg"
            alt="FAQ Illustration"
          />
        </div>
        <div className="card rounded-box grid grow gap-4">
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                What is the Building Management System?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                It is a software platform that helps manage apartments, tenants, payments, announcements, and overall building operations efficiently.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                Who can use the system?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Users include Admins, Members, and regular tenants. Each role has different access permissions and functionalities within the system.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                How do I pay my apartment dues?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Payments can be made directly through the dashboard using integrated payment gateways. Members can also view payment history and download receipts.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                Can I view announcements and notifications?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Yes, all users can view building announcements and notifications directly from their dashboard to stay updated.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                How do I report a maintenance issue?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Members can submit maintenance requests via the dashboard, which will be routed to the admin for resolution.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                How is member information managed?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Admins can add, update, and manage member details including personal info, apartment assignment, and contact information securely.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                What features are available on the Admin Dashboard?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                Admins can view overall stats, manage apartments and members, monitor payments, send announcements, and generate reports.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              <p className="text-md font-bold italic text-gray-600">
                How secure is the system?
              </p>
            </div>
            <div className="collapse-content text-sm">
              <p className="font-semibold text-gray-500">
                The system uses authentication, role-based access, and encrypted data storage to ensure all user and building information is secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
