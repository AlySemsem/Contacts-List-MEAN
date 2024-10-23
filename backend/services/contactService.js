import Contact from "../models/contactModel.js";

class ContactService {
  //^ Create Contact
  async createContact(contactData) {
    const contact = new Contact(contactData);
    return await contact.save();
  }

  //^ Get Contacts
  async getAllContacts(page, limit, filter) {
    const skip = (page - 1) * limit;
    const total = await Contact.countDocuments();
    const contacts = await Contact.find(filter).skip(skip).limit(limit);
    return {
      contacts,
      total,
    };
  }

  //^ Get Contact by ID
  async getContactById(id) {
    return await Contact.findById(id);
  }

  //^ Update Contact by ID
  async updateContact(id, updatedData) {
    return await Contact.findByIdAndUpdate(id, updatedData, { new: true });
  }

  //^ Delete Contact by ID
  async deleteContact(id) {
    return await Contact.findByIdAndDelete(id);
  }

  //^ Lock Contact
  async lockContact(id) {
    return await Contact.findByIdAndUpdate(id, { locked: true }, { new: true });
  }

  //^ Unlock Contact
  async unlockContact(id) {
    return await Contact.findByIdAndUpdate(
      id,
      { locked: false },
      { new: true }
    );
  }
}

export default new ContactService();
