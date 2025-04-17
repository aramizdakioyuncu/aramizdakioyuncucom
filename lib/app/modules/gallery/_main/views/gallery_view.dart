import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class GalleryView extends StatelessWidget {
  const GalleryView({super.key});

  @override
  Widget build(Object context) {
    return BodyWidget.custom1(
      transparentBody: true,
      context,
      body: [
        Wrap(
          children: [
            ...List.generate(
              10,
              (index) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    height: 220,
                    width: 220,
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      image: DecorationImage(
                        image: CachedNetworkImageProvider(
                          "${APIConstants.storageDomain}/galeri/assetto-corsa/6orijinal16648322192.jpg",
                        ),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Center(
                      child: Container(
                        width: double.infinity,
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Colors.black,
                              Color.fromARGB(101, 148, 148, 148),
                              Colors.black,
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomCenter,
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            // Get.toNamed("/galeriler/assetto-corsa");
                            Functions.gotoPage("/galeriler/assetto-corsa");
                          },
                          child: const Padding(
                            padding: EdgeInsets.all(3.0),
                            child: Text(
                              "Assetto Corsa",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            )
          ],
        ),
      ],
    );
  }
}
