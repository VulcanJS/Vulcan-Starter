// First, we import this from vulcan core, which is a utility to add a new route.
import { addRoute, Components } from 'meteor/vulcan:core';

import '../components/MainPage/MainPage.jsx'

addRoute({ name: 'entry', path: '/', componentName: 'MainPage' });
addRoute({ name: 'scheduleresidents', path: '/scheduleresidents', componentName: 'ScheduleResidents' });
addRoute({ name: 'manageresidents', path: '/manageresidents', componentName: 'ManageResidents' });
addRoute({ name: 'managedepartments', path: '/managedepartments', componentName: 'ManageDepartments' });
addRoute({ name: 'manageshifts', path: '/manageshifts', componentName: 'ManageShifts' });
addRoute({ name: 'manageblocks', path: '/manageblocks', componentName: 'ManageBlocks' });
addRoute({ name: 'acceptschedule', path: '/acceptschedule', componentName: 'AcceptSchedule' });
addRoute({ name: 'requestvacation', path: '/requestvacation', componentName: 'RequestVacation' });
addRoute({ name: 'requestswap', path: '/requestswap', componentName: 'RequestSwap' });
addRoute({ name: 'requestswap', path: '/test', componentName: 'ServiceBlockScheduler' });
