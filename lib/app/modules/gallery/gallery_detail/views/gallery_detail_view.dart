import 'package:aramizdakioyuncucom/app/modules/gallery/gallery_detail/controllers/gallery_detail_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GalleryDetailView extends StatelessWidget {
  const GalleryDetailView({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(GalleryDetailController());
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    return BodyWidget.custom1(context, scaffoldKey, body: [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 80.0),
        child: Container(
          color: Colors.white,
          child: Wrap(
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
        ),
      )
    ]);
  }
}
