import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class ModdetailView extends StatelessWidget {
  const ModdetailView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 180.0),
          child: Container(
            color: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Container(
                              height: 600,
                              color: const Color.fromARGB(255, 34, 34, 34),
                              child: Column(
                                children: [
                                  Expanded(
                                    child: CachedNetworkImage(
                                      width: double.infinity,
                                      fit: BoxFit.cover,
                                      imageUrl:
                                          "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                    ),
                                  ),
                                  Scrollbar(
                                    thumbVisibility: true,
                                    child: SingleChildScrollView(
                                      scrollDirection: Axis.horizontal,
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment
                                            .start, // Sola hizalama

                                        children: [
                                          CachedNetworkImage(
                                            height: 100,
                                            width: 200,
                                            fit: BoxFit.cover,
                                            imageUrl:
                                                "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                          ),
                                          CachedNetworkImage(
                                            height: 100,
                                            width: 200,
                                            fit: BoxFit.cover,
                                            imageUrl:
                                                "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                          ),
                                          CachedNetworkImage(
                                            height: 100,
                                            width: 200,
                                            fit: BoxFit.cover,
                                            imageUrl:
                                                "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                          ),
                                          CachedNetworkImage(
                                            height: 100,
                                            width: 200,
                                            fit: BoxFit.cover,
                                            imageUrl:
                                                "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                          ),
                                          CachedNetworkImage(
                                            height: 100,
                                            width: 200,
                                            fit: BoxFit.cover,
                                            imageUrl:
                                                "https://aramizdakioyuncu.com/galeri/images/1orijinal11652557017.png",
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const Text(
                            "Her yer açılmış DLC virüs taramsı yapılmıştır güvenle indirebilirsiniz.",
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      width: 360,
                      child: Column(
                        children: [
                          ElevatedButton(
                            onPressed: () {},
                            child: const Text("İndir"),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
