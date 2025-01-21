import 'package:aramizdakioyuncucom/app/modules/gallery/gallery_detail/controllers/gallery_detail_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GalleryDetailView extends StatelessWidget {
  const GalleryDetailView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(GalleryDetailController());
    return BodyWidget.custom1(
      context,
      body: [
        Column(
          children: [
            Wrap(
              children: [
                ...List.generate(
                  10,
                  (index) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        height: 200,
                        width: 300,
                        decoration: const BoxDecoration(
                          image: DecorationImage(
                            image: CachedNetworkImageProvider(
                              "https://aramizdakioyuncu.com/galeri/images/1minnak31678774004.jpg",
                            ),
                            fit: BoxFit.cover,
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(5)),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Container(
                  //   height: 32,
                  //   width: 32,
                  //   color: Colors.red,
                  //   child: const Center(
                  //     child: Text(
                  //       "<<",
                  //       style: TextStyle(color: Colors.white),
                  //     ),
                  //   ),
                  // ),
                  ...List.generate(
                    10,
                    (index) {
                      return InkWell(
                        onTap: () {
                          Functions.gotoPage(
                              "/galeriler/${controller.gallery}/${index + 1}");
                        },
                        child: Container(
                          height: 32,
                          width: 32,
                          color: controller.page == (index + 1).toString()
                              ? Colors.black
                              : Colors.red,
                          child: Center(
                            child: Text(
                              (index + 1).toString(),
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  // Container(
                  //   height: 32,
                  //   width: 32,
                  //   color: Colors.red,
                  //   child: const Center(
                  //     child: Text(
                  //       ">>",
                  //       style: TextStyle(color: Colors.white),
                  //     ),
                  //   ),
                  // ),
                ],
              ),
            )
          ],
        )
      ],
    );
  }
}
