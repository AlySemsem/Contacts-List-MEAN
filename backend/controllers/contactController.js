import ContactService from "../services/contactService.js";
import { io } from "../app.js";

class ContactController {
  //^ Create Contact Controller
  async createContact(req, res) {
    try {
      const contact = await ContactService.createContact(req.body);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //^ Get All Contacts Controller
  async getAllContacts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const contacts = await ContactService.getAllContacts(page, limit);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //^ Get Contact by ID Contoller
  async getContactById(req, res) {
    try {
      const contact = await ContactService.getContactById(req.params.id);
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //^ Update Contact by ID Controller
  async updateContact(req, res) {
    try {
      const contact = await ContactService.updateContact(
        req.params.id,
        req.body
      );
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //^ Delete Contact by ID Controller
  async deleteContact(req, res) {
    try {
      const contact = await ContactService.deleteContact(req.params.id);
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //^ Lock Contact by ID Controller
  async lockContact(req, res) {
    try {
      const contact = await ContactService.lockContact(req.params.id);
      io.emit("contactLocked", contact);
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //^ Unlock Contact by ID Controller
  async unlockContact(req, res) {
    try {
      const contact = await ContactService.unlockContact(req.params.id);
      io.emit("contactUnlocked", contact);
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ContactController();
