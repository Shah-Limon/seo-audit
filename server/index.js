const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    /* Seo audit collection */
    const auditRequestCollections = client.db("seoWebsite").collection("auditRequest");
    const userCollection = client.db("seoWebsite").collection("users");
    const userProfileCollections = client.db("seoWebsite").collection("userProfile");
    const ContactMessageCollections = client.db("seoWebsite").collection("contactMessage");



    /* auditRequestCollections */
    app.post("/add-audit-request", async (req, res) => {
      const addProfile = req.body;
      const result = await auditRequestCollections.insertOne(addProfile);
      res.send(result);
    });

    app.get("/audits", async (req, res) => {
      const query = {};
      const cursor = auditRequestCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });

    app.get("/audit/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const profile = await auditRequestCollections.findOne(query);
      res.send(profile);
    });

    app.put("/audit/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          status: edit.status,
        },
      };

      const result = await auditRequestCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete("/audit/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const result = await auditRequestCollections.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Deleted successfully" });
        } else {
          res.status(404).json({ message: "Not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    /*userCollection   */
    app.post("/add-user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    app.get("/user/:id", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });


    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const userUpdate = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          userName: userUpdate.userName,
          userEmail: userUpdate.userEmail,
          userRole: userUpdate.userRole,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const result = await userCollection.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    /* userProfileCollections */

    app.post("/add-profile-info", async (req, res) => {
      const addProfile = req.body;
      const result = await userProfileCollections.insertOne(addProfile);
      res.send(result);
    });

    app.put("/update-profile/:id", async (req, res) => {
      const id = req.params.id;
      const edit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          userName: edit.userName,
          profileImg: edit.profileImg,
        },
      };

      const result = await userProfileCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/profiles", async (req, res) => {
      const query = {};
      const cursor = userProfileCollections.find(query);
      const leads = await cursor.toArray();
      res.send(leads);
    });

    app.get("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const profile = await userProfileCollections.findOne(query);
      res.send(profile);
    });
    /* ContactMessageCollections */

    app.post("/add-contact-message", async (req, res) => {
      const contact = req.body;
      const result = await ContactMessageCollections.insertOne(contact);
      res.send(result);
    });

    app.get("/contact-messages", async (req, res) => {
      const query = {};
      const cursor = ContactMessageCollections.find(query);
      const contact = await cursor.toArray();
      res.send(contact);
    });
    app.get("/contact-message/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const contact = await ContactMessageCollections.findOne(query);
      res.send(contact);
    });

    app.put("/contact-message/:id", async (req, res) => {
      const id = req.params.id;
      const contact = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          messageStatus: contact.messageStatus,
        },
      };

      const result = await ContactMessageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });


  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Live Now");
});
app.listen(port, () => {
  console.log(`Server is Live Now ${port}`);
});
