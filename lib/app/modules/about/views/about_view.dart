import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:aramizdakioyuncucom/app/modules/about/controllers/about_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/joinus/joinus_permission_list.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AboutView extends StatelessWidget {
  const AboutView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(AboutController());
    return BodyWidget.custom1(
      context,
      body: [
        Obx(
          () => controller.about.value == null
              ? const Center(
                  child: CupertinoActivityIndicator(),
                )
              : Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    controller.about.value!,
                  ),
                ),
        ),
        Obx(
          () => controller.departments.value == null
              ? const Center(
                  child: CupertinoActivityIndicator(),
                )
              : Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: List.generate(
                      controller.departments.value!.length,
                      (index) {
                        APIJoinusPermissionList roleINFO =
                            controller.departments.value![index];
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            children: [
                              Container(
                                width: 10,
                                height: 10,
                                decoration: BoxDecoration(
                                  color: Colors.red,
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Text("${roleINFO.value} (${roleINFO.category})"),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ),
        ),
        Container(
          color: Colors.black,
          height: 110,
          width: double.infinity,
          child: Center(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyu1.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyu2.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyu3.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyu4.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyu5.png",
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        Container(
          color: Colors.black,
          height: 110,
          width: double.infinity,
          child: Center(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyukelime1.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyukelime2.png",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyukelime3.png",
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        Container(
          color: Colors.black,
          height: 110,
          width: double.infinity,
          child: Center(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyuvector1.jpg",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyuvector2.jpg",
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      imageUrl:
                          "${APIConstants.storageDomain}/galeri/ana-yapi/logolar/armoyuvector3.jpg",
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
