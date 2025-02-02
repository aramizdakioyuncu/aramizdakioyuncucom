import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_meeting_controller.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/controlpanel/controlpanel_meetinglist.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ControlpanelMeetingView extends StatelessWidget {
  const ControlpanelMeetingView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ControlpanelMeetingController());
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(
            children: [
              SizedBox(
                width: 200,
                child: ARMOYU.widget.textField.costum3(
                  controller: TextEditingController(),
                  onChanged: (val) {},
                  title: "TARİH",
                ),
              ),
              const Spacer(),
              ARMOYU.widget.elevatedButton.costum1(
                text: "TOPLANTI OLUŞTUR",
                onPressed: () {},
                loadingStatus: false,
              ),
            ],
          ),
          Obx(
            () => controller.meetingList.value == null
                ? const Center(
                    child: CupertinoActivityIndicator(),
                  )
                : Table(
                    columnWidths: const {
                      1: FixedColumnWidth(150),
                      2: FixedColumnWidth(150),
                      3: FixedColumnWidth(80),
                      4: FixedColumnWidth(100),
                    },
                    children: [
                      const TableRow(
                        children: [
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Toplantı',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text(
                                'Yönetim',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Center(
                              child: Text(
                                'Zaman',
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              'Katılım',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              '',
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      ...List.generate(
                        controller.meetingList.value!.length,
                        (index) {
                          APIControlpanelMeetinglist meetingInfo =
                              controller.meetingList.value![index];
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
                                child: Text(
                                  meetingInfo.etkinlikAdi,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CircleAvatar(
                                      foregroundImage:
                                          CachedNetworkImageProvider(
                                        meetingInfo.olusturanAvatar,
                                      ),
                                    ),
                                    Text(
                                      meetingInfo.olusturan,
                                      overflow: TextOverflow.ellipsis,
                                    )
                                  ],
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Column(
                                  children: [
                                    Text(
                                      meetingInfo.zaman.split(" ").last,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    Text(
                                      meetingInfo.zaman.split(" ").first,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ],
                                ),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: Text(
                                    '${meetingInfo.katilimciSayisi}/${meetingInfo.katilimLimit}'),
                              ),
                              TableCell(
                                verticalAlignment:
                                    TableCellVerticalAlignment.middle,
                                child: ARMOYU.widget.elevatedButton.costum1(
                                  text: "İNCELE",
                                  onPressed: () {},
                                  loadingStatus: false,
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
