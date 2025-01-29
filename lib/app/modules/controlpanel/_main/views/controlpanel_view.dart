import 'package:aramizdakioyuncucom/app/modules/controlpanel/_main/controllers/controlpanel_controller.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_adduser_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_events_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_raffle_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_schools_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_settings_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/editor/_main/views/editor_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_home_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_meeting_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_statistics_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_support_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_users_view.dart';
import 'package:aramizdakioyuncucom/app/modules/controlpanel/pages/controlpanel_announcement_view.dart';
import 'package:aramizdakioyuncucom/app/widgets/app_widget.dart';
import 'package:aramizdakioyuncucom/app/widgets/body/views/body_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ControlpanelView extends StatelessWidget {
  const ControlpanelView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(ControlpanelController());
    return BodyWidget.custom1(
      context,
      body: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Center(
                child: AppWidget.controlpanelMenu(
                  selectedIndex: 0,
                  onTap: (index) {
                    controller.pageController.value.jumpToPage(index);
                  },
                ),
              ),
              const Center(
                child: Text('Sunucu Saati : 2021-09-30 12:00:00'),
              ),
            ],
          ),
        ),
        SizedBox(
          height: Get.height * 0.9,
          child: PageView(
            physics: const NeverScrollableScrollPhysics(),
            controller: controller.pageController.value,
            children: const [
              SingleChildScrollView(
                child: ControlpanelHomeView(),
              ),
              SingleChildScrollView(
                child: ControlpanelMeetingView(),
              ),
              SingleChildScrollView(
                child: ControlpanelStatisticsView(),
              ),
              SingleChildScrollView(
                child: ControlpanelAdduserView(),
              ),
              SingleChildScrollView(
                child: ControlpanelUsersView(),
              ),
              SingleChildScrollView(
                child: ControlpanelSupportView(),
              ),
              SingleChildScrollView(
                child: EditorView(),
              ),
              SingleChildScrollView(
                child: ControlpanelEventsView(),
              ),
              SingleChildScrollView(
                child: ControlpanelSchoolsView(),
              ),
              SingleChildScrollView(
                child: ControlpanelRaffleView(),
              ),
              SingleChildScrollView(
                child: ControlpanelAnnouncementView(),
              ),
              SingleChildScrollView(
                child: ControlpanelSettingsView(),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
