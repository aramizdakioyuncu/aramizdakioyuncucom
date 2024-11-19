import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class AppWidget {
  static void loginModal(
    context, {
    required TextEditingController username,
    required TextEditingController userpassword,
    required Function login,
    required Function register,
  }) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SizedBox(
            width: 500,
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  CachedNetworkImage(
                    imageUrl:
                        "https://aramizdakioyuncu.com/galeri/ana-yapi/armoyu.png",
                    height: 130,
                    width: 130,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: SizedBox(
                          height: 300,
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: TextField(
                                  controller: username,
                                  decoration: const InputDecoration(
                                    labelText: "Kullanıcı Adı",
                                    border: OutlineInputBorder(),
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: TextField(
                                  controller: userpassword,
                                  decoration: const InputDecoration(
                                    labelText: "Şifre",
                                    border: OutlineInputBorder(),
                                  ),
                                  obscureText: true,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Row(
                                  children: [
                                    ClipOval(
                                      child: CachedNetworkImage(
                                        height: 32,
                                        width: 32,
                                        filterQuality: FilterQuality.high,
                                        imageUrl:
                                            "https://aramizdakioyuncu.com/galeri/ana-yapi/facebook-logo.png",
                                      ),
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/ana-yapi/steam-logo.png",
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/ana-yapi/apple-logo.png",
                                    ),
                                    const Spacer(),
                                    CachedNetworkImage(
                                      height: 32,
                                      width: 32,
                                      filterQuality: FilterQuality.high,
                                      imageUrl:
                                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRRToVGTHOEuz4_Lxu_wfQrZGurCrtNb1hpQ&s",
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(
                                width: 500,
                                child: ElevatedButton(
                                  style: const ButtonStyle(
                                    shape: WidgetStatePropertyAll(
                                      RoundedRectangleBorder(
                                        borderRadius: BorderRadius.zero,
                                      ),
                                    ),
                                  ),
                                  onPressed: () {
                                    login();
                                  },
                                  child: const Text("Giriş YAP"),
                                ),
                              ),
                              const Spacer(),
                              ElevatedButton(
                                style: const ButtonStyle(
                                    shape: WidgetStatePropertyAll(
                                      RoundedRectangleBorder(
                                        borderRadius: BorderRadius.zero,
                                      ),
                                    ),
                                    backgroundColor: WidgetStatePropertyAll(
                                      Colors.purple,
                                    )),
                                onPressed: () {},
                                child: const Text("ŞİFRE AL"),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Expanded(
                        child: SizedBox(
                          height: 300,
                          child: Column(
                            children: [
                              CachedNetworkImage(
                                  imageUrl:
                                      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=159-146-79-16-23-09"),
                              const Text("Kalan Zaman:"),
                              const Spacer(),
                              ElevatedButton(
                                style: const ButtonStyle(
                                  shape: WidgetStatePropertyAll(
                                    RoundedRectangleBorder(
                                      borderRadius: BorderRadius.zero,
                                    ),
                                  ),
                                ),
                                onPressed: () {
                                  register();
                                },
                                child: const Text("KAYIT OL"),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
