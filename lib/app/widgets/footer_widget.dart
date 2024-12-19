import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class FooterWidget {
  static Widget custom() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Colors.black,
              Color.fromARGB(255, 255, 17, 0),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          children: [
            Row(
              children: [
                const Expanded(
                  flex: 3,
                  child: Padding(
                    padding: EdgeInsets.all(8.0),
                    child: SizedBox(
                      height: 300,
                      child: Column(
                        children: [
                          Text(
                            "Mevcut Oyuncu Sayımız",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Expanded(
                            child: Center(
                              child: Text(
                                "1684",
                                style: TextStyle(
                                  fontSize: 50,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const Expanded(
                  flex: 3,
                  child: Padding(
                    padding: EdgeInsets.all(8.0),
                    child: SizedBox(
                      height: 300,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Çevrimiçi Üyelerimiz",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            "Açık Kimse Yok",
                            style: TextStyle(
                              fontSize: 10,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      height: 300,
                      child: SingleChildScrollView(
                        child: Column(
                          children: [
                            const Text(
                              "Haberler",
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Row(
                              children: [
                                Expanded(
                                  flex: 2,
                                  child: CachedNetworkImage(
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/yazi/1posterminnak1715776167.jpg",
                                    width: double.infinity,
                                    height: 80,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                const Expanded(
                                  flex: 2, // Genişliğin 2 birimi
                                  child: Padding(
                                    padding: EdgeInsets.all(8.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment
                                          .start, // Sol hizalama
                                      children: [
                                        Text(
                                          "Fatsa'da Türk Halk Müziği konseri yapıldı.",
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.white,
                                          ),
                                        ),
                                        Text(
                                          "Konserde çok güzel eğlenildi ödülleri verildif akls fjklsg jklsgf kdsjdsks ljlık...",
                                          textAlign: TextAlign.justify,
                                          style: TextStyle(
                                            fontSize: 10,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const Divider(
                              color: Colors.red,
                              thickness: 0.5,
                            ),
                            Row(
                              children: [
                                Expanded(
                                  flex: 2,
                                  child: CachedNetworkImage(
                                    imageUrl:
                                        "https://aramizdakioyuncu.com/galeri/yazi/417haberlerminnak1675644437.jpg",
                                    width: double.infinity,
                                    height: 80,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                                const Expanded(
                                  flex: 2,
                                  child: Padding(
                                    padding: EdgeInsets.all(8.0),
                                    child: Column(
                                      children: [
                                        Text(
                                          "The Witcher 3 Patch 4.01 Güncellemesi",
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.white,
                                          ),
                                        ),
                                        Text(
                                          "Konserde çok güzel eğlenildi ödülleri verildif akls fjklsg jklsgf kdsjdsks ljlık...",
                                          textAlign: TextAlign.justify,
                                          style: TextStyle(
                                            fontSize: 10,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: SizedBox(
                      height: 300,
                      child: Column(
                        children: [
                          const Text(
                            "Sosyal Bağlantılar",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Column(
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: List.generate(
                                  3,
                                  (index) {
                                    return InkWell(
                                      onTap: () {},
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: CachedNetworkImage(
                                          imageUrl: Applist
                                              .footersocailnetwork[index],
                                          height: 60,
                                          width: 60,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: List.generate(
                                  3,
                                  (index) {
                                    return InkWell(
                                      onTap: () {},
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: CachedNetworkImage(
                                          imageUrl: Applist
                                              .footersocailnetwork[index + 3],
                                          height: 60,
                                          width: 60,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                            ],
                          ),
                          CachedNetworkImage(
                            imageUrl:
                                "https://aramizdakioyuncu.com/galeri/ana-yapi/etbis.png",
                            height: 60,
                            width: 60,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const Row(
              children: [
                Expanded(
                  child: Text(
                    "Bu aramizdakioyuncu.com platformun Tüm Hakları Saklıdır.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.mail,
                        color: Colors.white,
                        size: 16,
                      ),
                      Text(
                        "yonetimekibi@aramizdakioyuncu.com",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.phone,
                        color: Colors.white,
                        size: 16,
                      ),
                      Text(
                        "+905370585150",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
