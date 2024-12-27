import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class EmployeeView extends StatelessWidget {
  const EmployeeView({super.key});

  @override
  Widget build(BuildContext context) {
    return BodyWidget.custom1(context, body: [
      Wrap(
        children: List.generate(
          4,
          (index) {
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                height: 250,
                width: 280,
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: CachedNetworkImageProvider(
                      "https://aramizdakioyuncu.com/galeri/profilresimleri/1profilresimufaklik1734874339.jpg",
                    ),
                    fit: BoxFit.cover,
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      const Spacer(),
                      const Text("data"),
                      const Text("Kurucu"),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(FontAwesomeIcons.instagram),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(FontAwesomeIcons.instagram),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(FontAwesomeIcons.instagram),
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(FontAwesomeIcons.instagram),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      )
    ]);
  }
}
