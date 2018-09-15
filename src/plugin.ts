import * as Discord from "discord.js";
import { Command } from "./command";
import { PluginManager } from "./plugin-handler";

export abstract class Plugin {
  abstract name: string;
  abstract desc: string;
  abstract commands: Command[];
  abstract callbacks: PluginCallbacks;

  constructor(
    public manager: PluginManager
  ) {}
}

interface PluginCallbacks {
  // tslint:disable:max-line-length
  channelCreate?(channel: Discord.Channel): void;
  channelDelete?(channel: Discord.Channel): void;
  channelPinsUpdate?(channel: Discord.Channel, time: Date): void;
  channelUpdate?(oldChannel: Discord.Channel, newChannel: Discord.Channel): void;
  clientUserGuildSettingsUpdate?(clientUserGuildSettings: Discord.ClientUserGuildSettings): void;
  clientUserSettingsUpdate?(clientUserSettings: Discord.ClientUserSettings): void;
  debug?(info: string): void;
  disconnect?(event: {}): void;
  emojiCreate?(emoji: Discord.Emoji): void;
  emojiDelete?(emoji: Discord.Emoji): void;
  emojiUpdate?(oldEmoji: Discord.Emoji, newEmoji: Discord.Emoji): void;
  error?(error: Error): void;
  guildBanAdd?(guild: Discord.Guild, user: Discord.User): void;
  guildBanRemove?(guild: Discord.Guild, user: Discord.User): void;
  guildCreate?(guild: Discord.Guild): void;
  guildDelete?(guild: Discord.Guild): void;
  guildMemberAdd?(member: Discord.GuildMember): void;
  guildMemberAvailable?(member: Discord.GuildMember): void;
  guildMemberRemove?(member: Discord.GuildMember): void;
  guildMembersChunk?(members: Discord.GuildMember[], guild: Discord.Guild): void;
  guildMemberSpeaking?(member: Discord.GuildMember, speaking: boolean): void;
  guildMemberUpdate?(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): void;
  guildUnavailable?(guild: Discord.Guild): void;
  guildUpdate?(oldGuild: Discord.Guild, newGuild: Discord.Guild): void;
  message?(message: Discord.Message): void;
  messageDelete?(message: Discord.Message): void;
  messageDeleteBulk?(messages: Discord.Collection<Discord.Snowflake, Discord.Message>): void;
  messageReactionAdd?(messageReaction: Discord.MessageReaction, user: Discord.User): void;
  messageReactionRemove?(messageReaction: Discord.MessageReaction, user: Discord.User): void;
  messageReactionRemoveAll?(message: Discord.Message): void;
  messageUpdate?(oldMessage: Discord.Message, newMessage: Discord.Message): void;
  presenceUpdate?(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): void;
  ready?(): void;
  reconnecting?(): void;
  resume?(replayed: number): void;
  roleCreate?(role: Discord.Role): void;
  roleDelete?(role: Discord.Role): void;
  roleUpdate?(oldRole: Discord.Role, newRole: Discord.Role): void;
  typingStart?(channel: Discord.Channel, user: Discord.User): void;
  typingStop?(channel: Discord.Channel, user: Discord.User): void;
  userNoteUpdate?(user: Discord.UserResolvable, oldNote: string, newNote: string): void;
  userUpdate?(oldUser: Discord.User, newUser: Discord.User): void;
  voiceStateUpdate?(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): void;
  warn?(info: string): void;
  // tslint:enable:max-line-length
}
