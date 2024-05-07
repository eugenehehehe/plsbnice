const OrderList = require('../models/index').order_list;
const OrderDetail = require('../models/index').order_detail;
const Coffee = require('../models/index').coffee;

// Fungsi untuk menambahkan transaksi baru
exports.createOrder = async (req, res) => {
  try {
    const { customer_name, order_type, order_date, order_detail } = req.body;

    if (customer_name === "" || order_type === "" || order_date === "" || order_detail === "") {
      return res.status(400).json({
        status: false,
        message: 'Semua data harus diisi'
      });
    }

    // Buat transaksi baru di tabel "order_list"
    const orderList = await OrderList.create({
      customer_name,
      order_type,
      order_date
    });

    // Simpan detail transaksi ke dalam tabel "order_detail"
    await Promise.all(order_detail.map(async (detail) => {
      const coffee = await Coffee.findByPk(detail.coffeeID); // Cari kopi berdasarkan ID
      await OrderDetail.create({
        listID: orderList.listID,
        coffeeID: detail.coffeeID,
        price: coffee.price, // Ambil harga kopi dari database
        quantity: detail.quantity
      });
    }));

    res.status(201).json({
      status: true,
      data: {
        id: orderList.listID,
        customer_name: orderList.customer_name,
        order_type: orderList.order_type,
        order_date: orderList.order_date,
        createdAt: orderList.createdAt,
        updatedAt: orderList.updatedAt
      },
      message: 'Pesanan berhasil dibuat'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: false, message: 'Gagal membuat pesanan', error: error.message });
  }
};

// Mendapatkan semua pesanan
exports.orderHistory = async (req, res) => {
    try {
        let data = await OrderList.findAll({
            include:
                [
                    {
                        model: OrderDetail,
                        as: 'order_detail'
                    }
                ]
        })
        return res.status(200).json({
            status: true,
            data: data,
            message: "Order list has been loaded"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}