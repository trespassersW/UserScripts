#!/usr/local/bin/perl 
# FROM: http://helpix.ru/cgi/fb2notes/
# На вход - имя каталога, где живут fb2-файлы. Или имя fb2-файла.
# Новые файлы получаются добавлением к имени файла суффикса _notes

use strict;
use integer;
#use encoding 'cp1251', STDOUT => 'cp866';
use utf8;

my $sFileOrDir = shift;

if ( -f $sFileOrDir ) {
  Do ( $sFileOrDir );
  exit;
}

opendir ( DP, $sFileOrDir ) || die "Cant open dir";
my @aFiles = readdir ( DP );
closedir ( DP );

foreach my $sFile ( @aFiles ) {
  next if ( $sFile =~ /^\./ );
  Do ( "$sFileOrDir/$sFile" );
}

exit;


sub Do {
  my $sFile = shift;
  return if !($sFile =~ /\.fb2$/) or ($sFile =~ /_notes\.fb2$/);
  # Прочитать первую строчку файла для определения кодировки
  open ( FP, $sFile ) || die "Cant open file $sFile";
  my $sStringFirst = <FP>; # <?xml version="1.0" encoding="UTF-8"?>
  close ( FP );
  my ($sEncoding) = ( $sStringFirst =~ /encoding\=[\"\'](.*?)[\"\']/ );
  if ( $sEncoding eq '' ) {
    print "Bad file. Cant find encoding $sFile\n";
    return 0;
  }

  open ( FP, "<:crlf:encoding($sEncoding)", "$sFile" ) || die "Cant open file $sFile";
  my @aData = <FP>;
  #chomp ( @aData );
  my $sDataAll = join ( '', @aData );
  close ( FP );


  ### Часть 1. Ищем блок сносок и вытаскивае из него сноски, которые должны быть в тексте.
  ### Формируем хэш со сносками $hNotesSections{$id}

  # Весь блок сносок
  my ($sNotes) = ( $sDataAll =~ /<body name\=[\"\']notes[\"\']>(.*?)<\/body>/gs );
  if ( $sNotes eq '' ) {
    print "$sFile No notes\n";
    return 1;
  }

  # Массив сносок
  my @aNotesSections = ( $sNotes =~ /<section.*?<\/section>/gs );

  # Преобразовать массив сносок в хэш
  my %hNotesSections;
  foreach my $sNotesSections ( @aNotesSections ) {
    my ($id) = ( $sNotesSections =~ /(<section.*?>)/gs ); # <section id="note_4">
    ($id) = ( $id =~ /id\=[\"\'](.*?)[\"\']/gs ); # note_4
    if ( $id eq '' ) {                
      my $qq = substr ( $sNotesSections, 0, 60 ) . '...';
      $qq =~ s/\s+/ /gmos;
      print "$sFile Note id not found in section $qq\n";
      next;
    }
    #print "1 $id\n";
    ($hNotesSections{$id}) = ( $sNotesSections =~ /<section.*?>(.*?)<\/section>/gs );
    #$hNotesSections{$id} =~ s/<title>//;
    #$hNotesSections{$id} =~ s/<\/title>//;
    $hNotesSections{$id} =~ s/<.*?>/ /gsmo;
  
    #print "$hNotesSections{$id}\n\n\n-------------------\n";
  }


  ### Часть 2. Ищем сноски внутри текста.
  ### Формируем хэш кусков текста, которые надо заменять: сносками $hNotes{'<a type="note" l:href="#n_1">[1]</a>'} = 'n_1'
  #my @aLinks = ( $sDataAll =~ /(<a\s+.*?type\=\"note\".*?>.*?<\/a>)/gs ); # <a type="note" l:href="#n_1">[1]</a> # Очень медленный regexp получился
  my @aLinks0 = ( $sDataAll =~ /(<a\s+.*?>.*?<\/a>)/gs ); # <a type="note" l:href="#n_1">[1]</a>
  my @aLinks;
  foreach my $sLink ( @aLinks0 ) {
    push ( @aLinks, $sLink ) if ( $sLink =~ /type\=[\"\']note[\"\']/ );
  }

  
  my %hNotes;
  foreach my $sLink ( @aLinks ) {
    my ($id) = ( $sLink =~ /(<a\s+.*?>)/gs ); # <a type="note" l:href="#n_1">
    ($id) = ( $id =~ /href\=[\"\']\#(.*?)[\"\']/gs ); # n_1
    if ( $id eq '' ) {
      print "$sFile Note id not found 2 in link $sLink\n";
      next;
    }
    $hNotes{$id} = $sLink;
    #print "2 $id\n";
  }


  ### Часть 3. Проверка. Каждая сноска должна быть и в тексте, и в блоке сносок, не так ли?

  my @kNotes         = keys ( %hNotes );
  my @kNotesSections = keys ( %hNotesSections );

  foreach my $k ( @kNotes ) {
    print "$sFile No $k in NotesSections\n" if ( $hNotesSections{$k} eq '' );  
  }
  foreach my $k ( @kNotesSections ) {
    print "$sFile No $k in Notes\n" if ( $hNotes{$k} eq '' );  
  }


  ### Часть 4. Заменяем в тексте ссылки на сноски на собственно текст сносок.
  foreach my $id ( @kNotes ) {
    # Что меняем:    $hNotes{$id}
    # На что меняем: $hNotesSections{$id}
  
    #print "-$hNotes{$id}-\n";

    $hNotesSections{$id} =~ s/[\n|\s]+/ /gs;
    $hNotesSections{$id} =~ s/^\s+//;
    $hNotesSections{$id} =~ s/\s+$//;
  
#    $sDataAll =~ s/\Q$hNotes{$id}/ \[\[$hNotesSections{$id}\]\] /gsm;
    $sDataAll =~ s/\Q$hNotes{$id}/\<sup\> \[$hNotesSections{$id}\]\ <\/sup\>/gsm;
    #print "No $k in Notes\n" if ( $hNotes{$k} eq '' );  
  }

  my $sFileOut = "$sFile";
  $sFileOut =~ s/.fb2$/_notes.fb2/;
  print "$sFileOut ". scalar @kNotes ." notes\n"; 
  open ( FP, ">:encoding($sEncoding)", "$sFileOut" ) || die "Cant open file $sFileOut";
  print FP "$sDataAll\n";
  close ( FP );
}
