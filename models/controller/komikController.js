const db = require('../models');

async function getAllKomik(req, res){
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    }
    catch (err) {
        console.error('Error fetching komik: ', err.message);
        res.status(500).json({error: 'Ga bisa fetch komik nya' });
    }
}

async function getKomikById(req,res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({error: 'Komik tidak ditemukan'});

        }
        res.status(200).json(komik);

    }catch (err) {
        console.error('error fetching komik by id:', err.message);
        res.status(500).json({error: 'Failed euy gabisa gatau'});

    }
}

async function createKomik(req, res) {
    const {title, description, author } = req.body || {};
    try {
        const newKomik = await db.Komik.create({ title, description, author });
        res.status(201).json(newKomik);

    } catch (err) {
        console.error('Error bikin komik nya', err.message);
        res.status(500).json({error: 'Gagal bikin komik nya'});
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const {title, description, author} = req.body || {};
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({error: 'Komik tidak ketemu'});
        }
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);

    }
    catch (err) {
        console.error('Error update buku nya', err.message);
        res.status(500).json({error: 'Gagal update bukuuuu' });
    }
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik ga di temuin'});
        }
        await komik.destroy();
        res.status(200).json({message: 'Komik bisa di delete'});
    }
    catch (err) {
        console.error('Error, gabisa di delete:', err.message);
        res.status(500).json({error: 'gagal gabisa pokoknya' });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};