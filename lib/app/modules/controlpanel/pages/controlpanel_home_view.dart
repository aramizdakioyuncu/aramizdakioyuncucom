import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_home_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/controlpanel/controlpanel_userslist.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class ControlpanelHomeView extends StatelessWidget {
  const ControlpanelHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ControlpanelHomeController());
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Obx(
            () => controller.usersList.value == null
                ? const Center(
                    child: CupertinoActivityIndicator(),
                  )
                : Table(
                    columnWidths: const {
                      0: FixedColumnWidth(30),
                      2: FixedColumnWidth(150),
                      3: FixedColumnWidth(150),
                      4: FixedColumnWidth(50),
                      5: FixedColumnWidth(100),
                      6: FixedColumnWidth(100),
                      7: FixedColumnWidth(80),
                    },
                    children: [
                      const TableRow(
                        children: [
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text(
                                '#',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Adı Soyadı',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Yetki',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Kayıt Eden',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Yaş',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Son Giriş',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Toplantı E-Y',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(''),
                          ),
                        ],
                      ),
                      ...List.generate(
                        controller.usersList.value!.length,
                        (index) {
                          APIControlpanelUserslist userInfo =
                              controller.usersList.value![index];
                          return TableRow(
                            decoration: BoxDecoration(
                              color: index % 2 == 0
                                  ? Colors.grey.shade200
                                  : Colors.white, // Striped Efekti
                            ),
                            children: [
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Center(
                                  child: Text(
                                    (index + 1).toString(),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Row(
                                  children: [
                                    CircleAvatar(
                                      foregroundImage:
                                          CachedNetworkImageProvider(
                                        userInfo.avatar.minURL,
                                      ),
                                    ),
                                    const SizedBox(width: 5),
                                    Expanded(
                                      child: Text(
                                        userInfo.displayName,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Text(
                                  userInfo.yetki,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Text(
                                  userInfo.kayitEden,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Text(
                                  userInfo.yas.toString(),
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Text(
                                  userInfo.sonGiris,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Row(
                                  children: [
                                    userInfo.kalanHak > 0
                                        ? Container()
                                        : const Padding(
                                            padding: EdgeInsets.all(2.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.check,
                                              size: 12,
                                            ),
                                          ),
                                    userInfo.kalanHak > 1
                                        ? Container()
                                        : const Padding(
                                            padding: EdgeInsets.all(2.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.check,
                                              size: 12,
                                            ),
                                          ),
                                    userInfo.kalanHak > 2
                                        ? Container()
                                        : const Padding(
                                            padding: EdgeInsets.all(2.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.check,
                                              size: 12,
                                            ),
                                          ),
                                    userInfo.kalanHak > 3
                                        ? Container()
                                        : const Padding(
                                            padding: EdgeInsets.all(2.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.check,
                                              size: 12,
                                            ),
                                          ),
                                    userInfo.kalanHak > 4
                                        ? Container()
                                        : const Padding(
                                            padding: EdgeInsets.all(2.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.check,
                                              size: 12,
                                            ),
                                          ),
                                  ],
                                ),
                              ),
                              TableCell(
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: ARMOYU.widget.elevatedButton.costum2(
                                    icon: const Icon(Icons.edit),
                                    onPressed: () {},
                                    loadingStatus: false,
                                  ),
                                ),
                              ),
                            ],
                          );
                        },
                      )
                    ],
                  ),
          )
        ],
      ),
    );
  }
}
