import dbconnection from "../../../utils/db";
import Product from "../../../model/products";
import data from '../../../utils/data'
dbconnection()

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const pro = await Product.find({});

                // res.status(200).json({ success: true, data: notes })
                res.send(pro)
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PP':
            try {
                await Product.deleteMany();
                const dat = await Product.insertMany(data.products);

                res.status(201).json({ success: true, data: dat })
                // res.status(201).json({ success: true  })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const note = await Note.create(req.body);

                res.status(201).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}