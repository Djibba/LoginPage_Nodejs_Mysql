let connexion = require('../connexion_mysql/database');

class Contact {
    constructor(contact) {
        this.contact = contact;
    }

    get nom() {
        return this.contact.nom;
    }

    get prenom() {
        return this.contact.prenom;
    }

    get numero() {
        return this.contact.numero;
    }

    get email() {
        return this.contact.email;
    }

    get adresse() {
        return this.contact.adresse;
    }

    get id() {
        return this.contact.id;
    }

    static create(nom, prenom, numero, email, adresse, coolback) {
        connexion.query('INSERT INTO contact SET nom = ?, prenom = ?, numero = ?, email = ?, adresse = ?', [nom, prenom, numero, email, adresse], function(err, result) {
            if (err) throw err
            coolback(result)
        })
    }

    static show(coolback) {
        connexion.query('SELECT * FROM contact', function(err, result) {
            if (err) throw err
            coolback(result)
        })
    }

    static showContact(id, coolback) {
        connexion.query('SELECT * FROM contact WHERE id = ?', [id], function(err, result) {
            if (err) throw err
            coolback(new Contact(result[0]))
        })
    }

    static update(id, nom, prenom, numero, email, adresse, coolback) {
        connexion.query('UPDATE contact SET nom = ?, prenom = ?, numero = ?, email = ?, adresse = ? WHERE id  = ?', [nom, prenom, numero, email, adresse, id], function(err, result) {
            if (err) throw err
            coolback(result)
        })
    }

    static delete(id, coolback) {
        connexion.query('DELETE FROM contact WHERE id = ?', [id], function(err, result) {
            if (err) throw err
            coolback(result)
        })
    }

}

module.exports = Contact;