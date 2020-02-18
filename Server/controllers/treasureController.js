module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        return res.status(200).send(await db.get_dragon_treasure(1))
    },
    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        return res.status(200).send(await db.get_user_treasure([req.session.user.id]))
    },
    addUserTreasure: async (req, res) => {
        const { treasureURL } = req.body
        const { id } = req.session.user
        const db = req.app.get('db')
        let userTreasure = await db.add_user_treasure([treasureURL, id])
        return res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')
        var allTreasure = await db.get_all_treasure()
        res.status(200).send(allTreasure)
    }

}