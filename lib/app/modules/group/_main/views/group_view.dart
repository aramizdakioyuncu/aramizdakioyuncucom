import 'package:aramizdakioyuncucom/app/modules/group/_main/controllers/group_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class GroupView extends StatelessWidget {
  const GroupView({super.key});

  @override
  Widget build(BuildContext context) {
    Get.put(GroupController());

    return BodyWidget.custom1(context, body: [
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 80.0),
        child: Wrap(
          children: [
            ...List.generate(
              14,
              (index) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: SizedBox(
                    width: 350,
                    child: Column(
                      children: [
                        Container(
                          height: 200,
                          width: double.infinity,
                          decoration: const BoxDecoration(
                            image: DecorationImage(
                                image: CachedNetworkImageProvider(
                                  "https://aramizdakioyuncu.com/galeri/gruplar/1gruplarbannerminnak1661124266.png",
                                ),
                                fit: BoxFit.cover),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              InkWell(
                                onTap: () {
                                  Get.toNamed("/gruplar/detail");
                                },
                                child: const CircleAvatar(
                                  foregroundImage: CachedNetworkImageProvider(
                                    "https://aramizdakioyuncu.com/galeri/gruplar/116gruplarlogominnak1664915337.png",
                                  ),
                                  radius: 30,
                                ),
                              ),
                              Container(
                                decoration: BoxDecoration(
                                    color: Colors.black38,
                                    borderRadius: BorderRadius.circular(5)),
                                child: const Padding(
                                  padding: EdgeInsets.all(4.0),
                                  child: Text(
                                    "RIHTIM",
                                    style: TextStyle(
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                        Container(
                          color: const Color.fromARGB(207, 255, 255, 255),
                          child: Material(
                            color: Colors.transparent,
                            child: Column(
                              children: [
                                const Padding(
                                  padding: EdgeInsets.all(5.0),
                                  child: Text(
                                    "Denizin verdiği huzur ile içinizi ferahlatacak bir yaşam sizi bekliyor",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                    textAlign: TextAlign.center,
                                  ),
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading:
                                      const FaIcon(FontAwesomeIcons.ticket),
                                  title: const Text(
                                    "RTM",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading: const FaIcon(FontAwesomeIcons.users),
                                  title: const Text(
                                    "15",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  trailing: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 4, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.red, // Kapalı için kırmızı
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Text(
                                          'Alım Kapalı',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ],
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading: const FaIcon(FontAwesomeIcons.globe),
                                  title: const Text(
                                    "",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading:
                                      const FaIcon(FontAwesomeIcons.calendar),
                                  title: const Text(
                                    "10.10.2020",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading: const FaIcon(FontAwesomeIcons.gear),
                                  title: const Text(
                                    "E-Spor/Takım",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                  ),
                                  leading:
                                      const FaIcon(FontAwesomeIcons.gamepad),
                                  title: const Text(
                                    "Minecraft",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  onTap: () {},
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ElevatedButton(
                                    onPressed: () {},
                                    child: const Icon(
                                      Icons.discord_rounded,
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            )
          ],
        ),
      )
    ]);
  }
}
