import 'package:aramizdakioyuncucom/app/modules/group/groupdetail/controllers/groupdetail_controller.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class GroupdetailView extends StatelessWidget {
  const GroupdetailView({super.key});

  @override
  Widget build(Object context) {
    final controller = Get.put(GroupdetailController());
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 80.0),
          child: Container(
            color: Colors.white,
            child: Column(
              children: [
                Stack(
                  children: [
                    Obx(
                      () => Container(
                        height: 380,
                        width: double.infinity,
                        decoration: BoxDecoration(
                          image: controller.groupInfo.value == null
                              ? null
                              : DecorationImage(
                                  image: CachedNetworkImageProvider(
                                    controller.groupInfo.value!.groupLogo!
                                        .mediaURL.minURL.value,
                                  ),
                                  fit: BoxFit.cover,
                                ),
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 30,
                      left: 45,
                      child: Column(
                        children: [
                          Obx(
                            () => Container(
                              decoration: BoxDecoration(
                                color: Colors.transparent,
                                shape: BoxShape.circle, // Dairesel şekil
                                border: Border.all(
                                  color: Colors.blue, // Şerit rengi
                                  width: 3, // Şerit genişliği
                                ),
                              ),
                              child: controller.groupInfo.value == null
                                  ? const CupertinoActivityIndicator()
                                  : CircleAvatar(
                                      foregroundColor: Colors.transparent,
                                      foregroundImage:
                                          CachedNetworkImageProvider(
                                        controller.groupInfo.value!.groupLogo!
                                            .mediaURL.minURL.value,
                                      ),
                                      radius: 60,
                                    ),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Container(
                            decoration: BoxDecoration(
                              color: Colors.black45,
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: Obx(
                              () => Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: controller.groupInfo.value == null
                                    ? const CupertinoActivityIndicator()
                                    : Text(
                                        controller.groupInfo.value!.groupName!,
                                        style: const TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Obx(
                  () => controller.groupusers.value == null
                      ? const CupertinoActivityIndicator()
                      : Wrap(
                          children: [
                            ...List.generate(
                              controller.groupusers.value!.length,
                              (index) {
                                return Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: InkWell(
                                    onTap: () {},
                                    child: Material(
                                      color: Colors.transparent,
                                      child: Wrap(
                                        children: [
                                          Container(
                                            height: 350,
                                            width: 300,
                                            decoration: const BoxDecoration(
                                              gradient: LinearGradient(
                                                colors: [
                                                  Colors.blue,
                                                  Color.fromARGB(
                                                      255, 7, 103, 151),
                                                  Color.fromARGB(
                                                      255, 3, 41, 107),
                                                  Colors.black,
                                                ],
                                                begin: Alignment.topLeft,
                                                end: Alignment.bottomRight,
                                              ),
                                            ),
                                            child: Padding(
                                              padding:
                                                  const EdgeInsets.all(8.0),
                                              child: Column(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: [
                                                  InkWell(
                                                    onTap: () {
                                                      Get.toNamed(
                                                          "/oyuncular/${controller.groupusers.value![index].userName}");
                                                    },
                                                    child: CircleAvatar(
                                                      foregroundImage:
                                                          CachedNetworkImageProvider(
                                                        controller
                                                            .groupusers
                                                            .value![index]
                                                            .avatar!
                                                            .mediaURL
                                                            .minURL
                                                            .value,
                                                      ),
                                                      radius: 80,
                                                    ),
                                                  ),
                                                  const SizedBox(height: 10),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.all(
                                                            4.0),
                                                    child: Text(
                                                      controller
                                                          .groupusers
                                                          .value![index]
                                                          .displayName!
                                                          .value,
                                                      style: const TextStyle(
                                                        color: Colors.white,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                      ),
                                                    ),
                                                  ),
                                                  Text(
                                                    controller
                                                        .groupusers
                                                        .value![index]
                                                        .role!
                                                        .name,
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              },
                            )
                          ],
                        ),
                )
              ],
            ),
          ),
        ),
      ],
    );
  }
}
