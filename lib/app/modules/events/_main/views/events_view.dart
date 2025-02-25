import 'dart:developer';

import 'package:aramizdakioyuncucom/app/modules/events/_main/controllers/events_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/event/event.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class EventsView extends StatelessWidget {
  const EventsView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(EventsController());
    return BodyWidget.custom1(
      context,
      transparentBody: true,
      body: [
        Obx(
          () => controller.eventList.value == null
              ? const Center(
                  child: CupertinoActivityIndicator(),
                )
              : Wrap(
                  children: List.generate(
                    controller.eventList.value!.length,
                    (index) {
                      APIEvent eventInfo = controller.eventList.value![index];
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Stack(
                          children: [
                            InkWell(
                              onTap: () {
                                log(eventInfo.link.toString());
                                Functions.gotoPage(
                                  "/etkinlikler/${eventInfo.link.split("/")[4]}/${eventInfo.link.split("/")[6]}",
                                  getnavgiate: true,
                                );
                              },
                              child: Container(
                                height: 200,
                                width: 280,
                                decoration: BoxDecoration(
                                  image: DecorationImage(
                                    image: CachedNetworkImageProvider(
                                      eventInfo.gameBanner,
                                    ),
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 20,
                              width: 280,
                              child: Center(
                                child: Text(
                                  eventInfo.gameName,
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              left: 0,
                              child: Container(
                                color: Colors.black.withValues(alpha: 0.8),
                                child: const Padding(
                                  padding: EdgeInsets.all(3.0),
                                  child: Text(
                                    "Aktif Etkinlik: 0",
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: Container(
                                color: const Color.fromARGB(255, 0, 204, 255)
                                    .withValues(alpha: 0.8),
                                child: const Padding(
                                  padding: EdgeInsets.all(3.0),
                                  child: Text(
                                    "Toplam Etkinlik: 0",
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
        )
      ],
    );
  }
}
