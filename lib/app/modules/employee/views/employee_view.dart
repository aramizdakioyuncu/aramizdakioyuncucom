import 'package:aramizdakioyuncucom/app/modules/employee/controllers/employee_controller.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/crew/crew_list.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class EmployeeView extends StatelessWidget {
  const EmployeeView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller =
        Get.put(EmployeeController(), tag: DateTime.now().toString());
    return BodyWidget.custom1(
      context,
      body: [
        Obx(
          () => controller.crewList.value == null
              ? const Center(
                  child: CupertinoActivityIndicator(),
                )
              : Wrap(
                  children: List.generate(
                    controller.crewList.value!.length,
                    (index) {
                      APICrewList crewMember =
                          controller.crewList.value![index];
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Stack(
                          children: [
                            Container(
                              height: 250,
                              width: 300,
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: CachedNetworkImageProvider(
                                    crewMember.avatar.minURL,
                                  ),
                                  fit: BoxFit.cover,
                                ),
                              ),
                              child: Align(
                                alignment: Alignment.bottomCenter,
                                child: Container(
                                  height: 125,
                                  width: double.infinity,
                                  color: Colors.black38,
                                  child: Column(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.all(3.0),
                                        child: Text(
                                          crewMember.displayName,
                                          style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(2.0),
                                        child: Text(
                                          crewMember.role.roleName,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(
                                            color: Colors.white,
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.all(2.0),
                                        child: Text(
                                          crewMember.role.roleCategory,
                                          overflow: TextOverflow.ellipsis,
                                          style: const TextStyle(
                                              color: Colors.red,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                      SingleChildScrollView(
                                        scrollDirection: Axis.horizontal,
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            crewMember.socialAccounts
                                                            .facebook ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .facebook ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .facebook!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.facebook,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts.github ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .github ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .github!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.github,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts
                                                            .instagram ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .instagram ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .instagram!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons
                                                          .instagram,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts
                                                            .linkedin ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .linkedin ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .linkedin!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.linkedin,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts.reddit ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .reddit ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .reddit!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.reddit,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts.steam ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .steam ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .steam!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.steam,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts.twitch ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .twitch ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .twitch!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.twitch,
                                                    ),
                                                  ),
                                            crewMember.socialAccounts.youtube ==
                                                        "" ||
                                                    crewMember.socialAccounts
                                                            .youtube ==
                                                        null
                                                ? Container()
                                                : IconButton(
                                                    iconSize: 20,
                                                    onPressed: () {
                                                      Functions.gotoPage(
                                                        crewMember
                                                            .socialAccounts
                                                            .youtube!,
                                                        newTab: true,
                                                      );
                                                    },
                                                    icon: const Icon(
                                                      color: Colors.red,
                                                      FontAwesomeIcons.youtube,
                                                    ),
                                                  ),
                                          ],
                                        ),
                                      ),
                                    ],
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
