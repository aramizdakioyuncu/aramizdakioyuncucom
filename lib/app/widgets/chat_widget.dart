import 'dart:developer';

import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:aramizdakioyuncucom/app/utils/applist.dart';
import 'package:armoyu_widgets/data/models/Chat/chat.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ChatWidget {
  static Widget chatlistWidget(context, Rxn<List<Chat>> chatdetails) {
    var chatliststatus = false.obs;

    return Applist.currentUser.value == null
        ? Container()
        : Positioned(
            right: 0,
            bottom: 0,
            child: Obx(
              () => Container(
                height: chatliststatus.value ? 500 : null,
                width: 300,
                color: Get.theme.scaffoldBackgroundColor,
                child: Column(
                  children: [
                    Container(
                      color: Colors.black,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            const Expanded(
                              child: Text(
                                "Sohbet",
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                            IconButton(
                              onPressed: () {
                                chatliststatus.value = !chatliststatus.value;
                              },
                              icon: const Icon(
                                Icons.arrow_drop_down_sharp,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    chatliststatus.value == true
                        ? ARMOYU.widget.chat.chatmyfriendsNotes(context)
                        : Container(),
                    chatliststatus.value == true
                        ? Expanded(
                            child: ARMOYU.widget.chat
                                .chatListWidget(
                                  context,
                                  onPressed: (chat) {
                                    chatdetails.value ??= [];

                                    if (!chatdetails.value!.any((detail) =>
                                        detail.user.userID ==
                                        chat.user.userID)) {
                                      chatdetails.value!.add(chat);
                                      chatdetails.refresh();
                                    }
                                  },
                                )
                                .widget
                                .value!,
                          )
                        : Container(),
                  ],
                ),
              ),
            ),
          );
  }

  static Widget chatdetailWidgets(
      BuildContext context, Rxn<List<Chat>> chatdetails) {
    return Obx(
      () => Applist.currentUser.value == null
          ? Container()
          : Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.only(right: 300.0),
                child: chatdetails.value == null
                    ? null
                    : Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children:
                            List.generate(chatdetails.value!.length, (index) {
                          var chatdetail = chatdetails.value![index];
                          log(chatdetails.value![index].toJson().toString());
                          var chatcalling = chatdetails.value![index].calling;
                          log(chatcalling.toString());
                          return Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 2.0),
                            child: Container(
                              height: 500,
                              width: 300,
                              color: Get.theme.scaffoldBackgroundColor,
                              child: chatcalling!.value == true
                                  ? ARMOYU.widget.chat.chatcallWidget(
                                      context,
                                      chat: chatdetail,
                                      onClose: () {
                                        chatcalling.value = false;
                                      },
                                      speaker: (value) {
                                        log(value.toString());
                                      },
                                      videocall: (value) {
                                        log(value.toString());
                                      },
                                    )
                                  : ARMOYU.widget.chat.chatdetailWidget(
                                      context,
                                      cachedChat: chatdetail,
                                      chatcall: (chat) {
                                        log("ringing");
                                        chatcalling.value = true;
                                      },
                                      onClose: () {
                                        chatdetails.value!.remove(chatdetail);
                                      },
                                      onPressedtoProfile: (userID, username) {
                                        Functions.gotoPage(
                                          "/oyuncular/$username",
                                          getnavgiate: true,
                                        );
                                      },
                                    ),
                            ),
                          );
                        }).toList(),
                      ),
              ),
            ),
    );
  }
}
